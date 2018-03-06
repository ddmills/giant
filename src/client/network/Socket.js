import io from 'socket.io-client';

class Socket {
  constructor(token) {
    this.token = token;
  }

  connect() {
    this.socket = io.connect('', {
      query: {
        token: this.token,
      }
    });

    this.socket.on('reconnect_attempt', () => {
      this.socket.io.opts.query.token = this.token;
    });
  }

  disconnect(...args) {
    return this.socket.disconnect(...args);
  }

  emit(...args) {
    return this.socket.emit(...args);
  }

  on(...args) {
    return this.socket.on(...args);
  }

  refreshToken(callback) {
    this.socket.emit('token', this.token, (response) => {
      this.token = response.token;

      callback(this.token);
    });
  }
}

export const createSocket = (token) => {
  const socket = new Socket(token);
  socket.connect();

  return socket;
}
