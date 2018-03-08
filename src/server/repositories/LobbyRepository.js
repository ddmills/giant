import {uuid} from '../utilities/Random';

const lobbies = {};

export function save(lobby, callback) {
  if (!lobby.id) {
    lobby.id = uuid();
  }

  lobbies[lobby.id] = lobby;

  callback(undefined, lobby);
}

export function get(lobbyId, callback) {
  callback(undefined, lobbies[lobbyId]);
}

export function getAll(callback) {
  callback(undefined, Object.values(lobbies));
}