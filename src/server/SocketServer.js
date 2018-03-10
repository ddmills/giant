import config from 'config';
import SocketIO from 'socket.io';
import {authorize as authorizeSocket} from 'socketio-jwt';
import {log, json} from './utilities/Logger';
import {refreshToken} from './utilities/Token';
import {createGame, joinGame} from './services/GameService';
import * as LobbyService from './services/LobbyService';
import {get as getAccount} from './repositories/AccountRepository';
import * as SocketRepository from './repositories/SocketRepository';

export const listen = (server) => {
  const io = SocketIO(server);

  io.use(authorizeSocket({
    secret: config.jwt.secret,
    handshake: true,
  }));

  io.on('connection', (client) => {
    log('[connection]');

    const user = client.decoded_token;

    SocketRepository.save(client.id, user.id, () => {
      SocketRepository.getAllForUser(user.id, (error, ids) => {
        console.log(user.name, ...ids);
      });
    });

    client.on('latency', (fn) => fn());

    client.on('lobby:create', (fn) => {
      log('[lobby:create]');
      LobbyService.create(user.id, (error, lobby) => {
        const room = `lobby-${lobby.id}`;

        client.join(room);
        io.to(room).emit('lobby:update', lobby);

        fn(lobby);
      });
    });

    client.on('lobby:get', (lobbyId, fn) => {
      log('[lobby:get]', client.id);
      LobbyService.get(lobbyId, (error, lobby) => {
        fn(error, lobby);
      });
    });

    client.on('lobby:join', (lobbyId, fn) => {
      log('[lobby:join]');
      LobbyService.join(user.id, lobbyId, (error, lobby) => {
        const room = `lobby-${lobby.id}`;

        client.join(room);
        io.to(room).emit('lobby:update', lobby);
      });
    });

    client.on('lobby:leave', (lobbyId, fn) => {
      log('[lobby:leave]');
      LobbyService.leave(user.id, lobbyId, (error, lobby) => {
        const room = `lobby-${lobbyId}`;

        io.to(room).emit('lobby:update', lobby);
        client.leave(room);
      });
    });

    client.on('token', (token, fn) => {
      refreshToken(token, (newToken) => {
        fn({
          token: newToken
        });
      });
    });

    client.on('disconnecting', () => {
      log('[disconnecting]');
      SocketRepository.remove(client.id, () => {
        SocketRepository.getAllForUser(user.id, (error, socketIds) => {
          if (socketIds.length > 0) {
            return;
          }

          LobbyService.getForUserId(user.id, (error, lobby) => {
            if (error || !lobby) {
              return;
            }

            LobbyService.removePlayer(user.id, lobby, (error) => {
              io.to(`lobby-${lobby.id}`).emit('lobby:update', lobby);
            });
          });
        });
      });
    });

    client.on('disconnect', () => {
      log('[disconnect]');
      client.emit('disconnected');
    });
  });

  return io;
};
