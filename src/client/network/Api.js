import {socket} from './Client';

export function signOut() {
  socket.emit('auth:sign-out');
}

export function createLobby() {
  socket.emit('lobby:create');
}

export function loadLobby(lobbyId) {
  socket.emit('lobby:get', lobbyId);
}

export function getLobbies() {
  socket.emit('lobby:index');
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

export function startLobby() {
  socket.emit('lobby:start');
}

export function loadGame(gameId) {
  socket.emit('game:get', gameId);
}
