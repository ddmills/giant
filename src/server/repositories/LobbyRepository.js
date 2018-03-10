import {uuid} from '../utilities/Random';

const lobbies = {};

export function save(lobby, callback) {
  if (!lobby.id) {
    lobby.id = uuid();
  }

  lobbies[lobby.id] = lobby;

  callback(undefined, lobby);
}

export function remove(lobbyId, callback) {
  delete lobbies[lobbyId];

  callback(undefined);
}

export function get(lobbyId, callback) {
  callback(undefined, lobbies[lobbyId]);
}

export function getAll(callback) {
  callback(undefined, Object.values(lobbies));
}

export function getForUser(userId, callback) {
  const lobby = Object.values(lobbies).find((lobby) => {
    return lobby.players.some((player) => player.id === userId)
  });

  callback(undefined, lobby);
}
