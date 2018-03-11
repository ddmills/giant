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

  function getSocket(socketId) {
    const ns = io.of('/');

    return ns.connected[socketId];
  }

  function emitToUser(userId, ...args) {
    io.to(`user-${userId}`).emit(...args);
  }

  function emitToLobby(lobbyId, ...args) {
    io.to(`lobby-${lobbyId}`).emit(...args);
  }

  function userJoinRoom(userId, room, callback = () => {}) {
    SocketRepository.getAllForUser(userId, (error, ids) => {
      if (error) {
        callback(error);
        return;
      }

      ids.forEach((socketId) => {
        getSocket(socketId).join(room);
      });
      callback();
    });
  }

  function userLeaveRoom(userId, room, callback = () => {}) {
    SocketRepository.getAllForUser(userId, (error, ids) => {
      if (error) {
        callback(error);
        return;
      }

      ids.forEach((socketId) => {
        getSocket(socketId).leave(room);
      });
      callback();
    });
  }

  io.use(authorizeSocket({
    secret: config.jwt.secret,
    handshake: true,
  }));

  io.on('connection', (client) => {
    log('[connection]');

    const user = client.decoded_token;
    const userRoom = `user-${user.id}`;

    client.join(userRoom);

    LobbyService.getForUserId(user.id, (error, lobby) => {
      if (lobby) {
        client.join(`lobby-${lobby.id}`);
        client.emit('lobby:update', lobby);
      }
    });

    SocketRepository.save(client.id, user.id, () => {
      SocketRepository.getAllForUser(user.id, (error, ids) => {
        console.log(`${user.name} has ${ids.length} sessions`);
      });
    });

    client.on('latency', (fn) => fn());

    client.on('lobby:create', () => {
      log('[lobby:create]');
      LobbyService.create(user.id, (error, lobby) => {
        if (error) {
          client.emit('lobby:error', error);
          return;
        }

        const room = `lobby-${lobby.id}`;

        userJoinRoom(user.id, room, (error) => {
          emitToLobby(lobby.id, 'lobby:update', lobby);
        });
      });
    });

    client.on('lobby:get', (lobbyId, fn) => {
      log('[lobby:get]', client.id);
      LobbyService.get(lobbyId, (error, lobby) => {
        if (error) {
          client.emit('lobby:error', error);
          return;
        }

        emitToLobby(lobby.id, 'lobby:update', lobby);
      });
    });

    client.on('lobby:join', (lobbyId) => {
      log('[lobby:join]');
      LobbyService.join(user.id, lobbyId, (error, lobby) => {
        if (error) {
          client.emit('lobby:error', error);
          return;
        }

        const room = `lobby-${lobby.id}`;

        userJoinRoom(user.id, room, (error) => {
          emitToLobby(lobby.id, 'lobby:update', lobby);
        });
      });
    });

    client.on('lobby:add-bot', () => {
      log('[lobby:add-bot]');
      LobbyService.addBot(user.id, (error, lobby) => {
        if (error) {
          client.emit('lobby:error', error);
          return;
        }

        emitToLobby(lobby.id, 'lobby:update', lobby);
      });
    });

    client.on('lobby:leave', () => {
      log('[lobby:leave]');
      LobbyService.leave(user.id, (error, lobby) => {
        if (error) {
          client.emit('lobby:error', error);
          return;
        }

        userLeaveRoom(user.id, `lobby-${lobby.id}`, (error) => {
          if (error) {
            return;
          }
          emitToUser(user.id, 'lobby:leave');
          emitToLobby(lobby.id, 'lobby:update', lobby);
        });
      });
    });

    client.on('token', (token, fn) => {
      refreshToken(token, (newToken) => {
        fn({
          token: newToken
        });
      });
    });

    client.on('auth:sign-out', () => {
      emitToUser(user.id, 'lobby:leave');
      emitToUser(user.id, 'auth:sign-out');
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
              emitToLobby(lobby.id, 'lobby:update', lobby);
            });
          });
        });
      });
    });

    client.on('disconnect', () => {
      log('[disconnect]');
    });
  });

  return io;
};
