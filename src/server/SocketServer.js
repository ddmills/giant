import config from 'config';
import SocketIO from 'socket.io';
import {authorize as authorizeSocket} from 'socketio-jwt';
import {log, json} from './utilities/Logger';
import {refreshToken} from './utilities/Token';
import {createGame, joinGame} from './services/GameService';
import {create as createLobby, get as getLobby} from './services/LobbyService';
import {get as getAccount} from './repositories/AccountRepository';

export const listen = (server) => {
  const io = SocketIO(server);

  io.use(authorizeSocket({
    secret: config.jwt.secret,
    handshake: true,
  }));

  io.on('connection', (socket) => {
    log('[connection]');

    socket.on('latency', (fn) => {
      fn();
    });

    socket.on('lobby:create', (fn) => {
      log('[lobby:create]');
      createLobby(socket.decoded_token.id, (error, lobby) => {
        json(lobby);
        fn(lobby);
      });
    });

    socket.on('lobby:get', (lobbyId, fn) => {
      log('[lobby:get]');
      getLobby(lobbyId, (error, lobby) => {
        json(lobby);
        fn(lobby);
      });
    });

    socket.on('game:join', (id, fn) => {
      log('[game:join]');
      joinGame(socket.decoded_token, id, (error, game) => {
        socket.join(`game-${game.id}`);
        fn();
      });
    });

    socket.on('token', (token, fn) => {
      refreshToken(token, (newToken) => {
        fn({
          token: newToken
        });
      });
    });

    socket.on('disconnect', () => {
      log('[disconnect]');
      socket.emit('disconnected');
    });
  });

  return io;
};
