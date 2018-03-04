import io from 'socket.io-client';

export const createSocket = (token) => {
  const socket = io.connect('', {
    query: {
      token
    }
  });

  const oldHandler = socket.onevent;

  socket.onevent = (packet) => {
    const args = packet.data || [];

    oldHandler.call(socket, packet);
    packet.data = ['*'].concat(args);
    oldHandler.call(socket, packet);
  }

  return socket;
}
