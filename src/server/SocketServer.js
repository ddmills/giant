import config from 'config';
import SocketIO from 'socket.io';
import {authorize as authorizeSocket} from 'socketio-jwt';
import {log, json, info} from './utilities/Logger';
import {create as createException} from './services/ExceptionService';
import {refreshToken} from './utilities/Token';
import {createGame, joinGame} from './services/GameService';
import * as LobbyService from './services/LobbyService';
import * as LobbySerializer from './services/LobbySerializer';
import {get as getAccount} from './repositories/AccountRepository';

export const listen = (server) => {
  const io = SocketIO(server);

  function getSocket(socketId) {
    const ns = io.of('/');

    return ns.connected[socketId];
  }

  function getSocketIdsForUser(userId, callback) {
    io.in(`user-${userId}`).clients(callback);
  }

  function emitToUser(userId, ...args) {
    io.to(`user-${userId}`).emit(...args);
  }

  function emitToLobby(lobbyId, ...args) {
    io.to(`lobby-${lobbyId}`).emit(...args);
  }

  function sendLobbyUpdateForUser(userId, lobby) {
    const lobbyData = LobbySerializer.serializeForUser(userId, lobby);

    emitToUser(userId, 'lobby:update', lobbyData);
  }

  function sendLobbyUpdate(lobby) {
    lobby.players.forEach((player) => {
      if (player.account.isBot) {
        return;
      }

      sendLobbyUpdateForUser(player.account.id, lobby);
    });
  }

  function userJoinRoom(userId, room, callback = () => {}) {
    getSocketIdsForUser(userId, (error, ids) => {
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
    getSocketIdsForUser(userId, (error, ids) => {
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
      }

      sendLobbyUpdateForUser(user.id, lobby);
    });

    getSocketIdsForUser(user.id, (error, ids) => {
      info(`${user.name} has ${ids.length} sessions`);
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
          sendLobbyUpdate(lobby);
        });
      });
    });

    client.on('lobby:get', (lobbyId) => {
      log('[lobby:get]');
      LobbyService.get(lobbyId, (error, lobby) => {
        if (error) {
          client.emit('lobby:error', error);
          return;
        }

        sendLobbyUpdate(lobby);
      });
    });

    client.on('lobby:index', () => {
      log('[lobby:index]');
      LobbyService.getAllPublic((error, lobbies) => {
        if (error) {
          client.emit('lobby:error', error);
          return;
        }

        client.emit('lobby:index', lobbies);
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
          sendLobbyUpdate(lobby);
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

        sendLobbyUpdate(lobby);
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
          sendLobbyUpdate(lobby);
        });
      });
    });

    client.on('lobby:end-turn', () => {
      log('[lobby:end-turn]');
      LobbyService.endTurn(user.id, (error, lobby) => {
        if (error) {
          client.emit('lobby:error', error);
          return;
        }

        sendLobbyUpdate(lobby);
      });
    });

    client.on('lobby:buy-blueprint', (cardId) => {
      log('[lobby:buy-blueprint]', cardId);
      LobbyService.buyBlueprint(user.id, cardId, (error, lobby) => {
        if (error) {
          client.emit('lobby:error', error);
        }

        sendLobbyUpdate(lobby);
      });
    });

    client.on('lobby:buy-hero', (cardId) => {
      log('[lobby:buy-hero]', cardId);
      LobbyService.buyHero(user.id, cardId, (error, lobby) => {
        if (error) {
          client.emit('lobby:error', error);
        }

        sendLobbyUpdate(lobby);
      });
    });

    client.on('lobby:start', () => {
      log('[lobby:start]');

      LobbyService.setup(user.id, (error, lobby) => {
        if (error) {
          client.emit('lobby:error', error);
          return;
        }

        sendLobbyUpdate(lobby);

        info('Game setup');

        setTimeout(() => {
          LobbyService.start(lobby.id, (error, lobby) => {
            info('Game starting');
            if (error) {
              emitToLobby(lobby.id, 'lobby:error', error);
              return;
            }

            sendLobbyUpdate(lobby);
          });
        }, lobby.countDownTime);
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
      getSocketIdsForUser(user.id, (error, socketIds) => {
        if (error) {
          createException(error, 500);
          return;
        }

        if (socketIds.length > 1) {
          return;
        }

        LobbyService.getForUserId(user.id, (error, lobby) => {
          if (error) {
            createException(error, 500);
            return;
          }

          if (!lobby) {
            return;
          }

          setTimeout(() => {
            getSocketIdsForUser(user.id, (error, clients) => {
              if (error) {
                createException(error, 500);
                return;
              }

              if (clients.length > 0) {
                return;
              }

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
                  sendLobbyUpdate(lobby);
                });
              });
            });
          }, 20000);
        });
      });
    });

    client.on('disconnect', () => {
      log('[disconnect]');
    });
  });

  return io;
};
