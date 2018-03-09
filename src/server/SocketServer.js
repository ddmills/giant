import config from 'config';
import SocketIO from 'socket.io';
import {authorize as authorizeSocket} from 'socketio-jwt';
import {log, json} from './utilities/Logger';
import {refreshToken} from './utilities/Token';
import {createGame, joinGame} from './services/GameService';
import {
  create as createLobby,
  get as getLobby,
  leave as leaveLobby,
  join as joinLobby
} from './services/LobbyService';
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
        const room = `lobby-${lobby.id}`;

        socket.join(room);
        io.to(room).emit('lobby:update', lobby);

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

    socket.on('lobby:join', (lobbyId, fn) => {
      log('[lobby:join]');
      joinLobby(socket.decoded_token.id, lobbyId, (error, lobby) => {
        const room = `lobby-${lobby.id}`;

        socket.join(room);
        io.to(room).emit('lobby:update', lobby);
      });
    });

    socket.on('lobby:leave', (lobbyId, fn) => {
      log('[lobby:leave]');
      leaveLobby(socket.decoded_token.id, lobbyId, (error, lobby) => {
        const room = `lobby-${lobby.id}`;

        console.log('player left', lobby);

        socket.leave(room);
        io.to(room).emit('lobby:update', lobby);
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
