import config from 'config';
import SocketIO from 'socket.io';
import {authorize as authorizeSocket} from 'socketio-jwt';
import {log} from './utilities/Logger';
import {refreshToken} from './utilities/Token';

export const listen = (server) => {
  const io = SocketIO(server);

  io.use(authorizeSocket({
    secret: config.jwt.secret,
    handshake: true,
  }));

  io.on('connection', (socket) => {
    log('[connect]');

    socket.on('greet', (request) => {
      log('[greet]');
      socket.emit('greet');
    });

    socket.on('latency', (fn) => {
      fn();
    });

    socket.on('token', (token, fn) => {
      log('refresh request', token);
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
