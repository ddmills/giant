import {create as createLobby} from '../domain/factories/LobbyFactory';
import {get as getAccount} from '../repositories/AccountRepository';
import {
  save as saveLobby,
  get as getLobby,
} from '../repositories/LobbyRepository';

export function create(userId, callback) {
  getAccount(userId, (error, account) => {
    if (error) {
      callback(error);
      return;
    }

    createLobby(account, (error, lobby) => {
      if (error) {
        callback(error);
        return;
      }

      saveLobby(lobby, callback);
    });
  });
}

export function get(lobbyId, callback) {
  getLobby(lobbyId, callback);
}
