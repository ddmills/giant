import config from 'config';
import SocketIO from 'socket.io';
import {authorize as authorizeSocket} from 'socketio-jwt';
import {log} from './utilities/Logger';
import {refreshToken} from './utilities/Token';
import {createGame, joinGame} from './services/GameService';

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

    socket.on('game:create', (properties, fn) => {
      log('[game:create]');
      createGame(socket.decoded_token, properties, (error, game) => {
        socket.join(`game-${game.id}`);

        fn(error, game);
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
