import {socket} from './Client';

export function signOut() {
  socket.emit('auth:sign-out');
}

export function createLobby() {
  socket.emit('lobby:create');
}

export function loadLobby(lobbyId, callback) {
  socket.emit('lobby:get', lobbyId, callback);
}

export function joinLobby(lobbyId) {
  socket.emit('lobby:join', lobbyId);
}

export function leaveLobby() {
  socket.emit('lobby:leave');
}

export function addBot() {
  socket.emit('lobby:add-bot');
}
