import {socket} from './Client';

export function createLobby(callback) {
  socket.emit('lobby:create', callback);
}

export function getLobby(id, callback) {
  socket.emit('lobby:get', id, callback);
}
