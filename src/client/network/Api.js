import {socket} from './Client';

export function signOut() {
  socket.emit('auth:sign-out');
}

export function latency(fn) {
  const start = Date.now();

  socket.emit('latency', () => fn(Date.now() - start));
}

export function createLobby() {
  socket.emit('lobby:create');
}

export function getLobby(lobbyId) {
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

export function endTurn() {
  socket.emit('lobby:end-turn');
}

export function buyBlueprint(cardId) {
  socket.emit('lobby:buy-blueprint', cardId);
}

export function buyHero(cardId) {
  socket.emit('lobby:buy-hero', cardId);
}

export function addBot() {
  socket.emit('lobby:add-bot');
}

export function startLobby() {
  socket.emit('lobby:start');
}
