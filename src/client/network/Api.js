import {socket} from './Client';

export function createLobby(callback) {
  socket.emit('lobby:create', callback);
}

export function getLobby(lobbyId, callback) {
  socket.emit('lobby:get', lobbyId, callback);
}

export function joinLobby(lobbyId, callback) {
  socket.emit('lobby:join', lobbyId, callback);
}

export function leaveLobby(lobbyId, callback) {
  socket.emit('lobby:leave', lobbyId, callback);
}
