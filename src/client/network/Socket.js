import io from 'socket.io-client';

const socket = io();
const oldHandler = socket.onevent;

socket.onevent = (packet) => {
  const args = packet.data || [];

  oldHandler.call(socket, packet);
  packet.data = ['*'].concat(args);
  oldHandler.call(socket, packet);
}

export default socket;
