import {create as createLobby} from '../domain/factories/LobbyFactory';
import {get as getAccount} from '../repositories/AccountRepository';
import {
  save as saveLobby,
  get as getLobby,
  remove as deleteLobby,
} from '../repositories/LobbyRepository';

export function join(userId, lobbyId, callback) {
  getAccount(userId, (error, account) => {
    if (error) {
      callback(error);
      return;
    }

    getLobby(lobbyId, (error, lobby) => {
      if (error) {
        callback(error);
        return;
      }

      lobby.addPlayer(account);

      saveLobby(lobby, callback);
    });
  });
}

export function leave(userId, lobbyId, callback) {
  getLobby(lobbyId, (error, lobby) => {
    if (error) {
      callback(error);
      return;
    }

    lobby.removePlayerById(userId);

    if (lobby.isEmpty) {
      deleteLobby(lobby.id, callback);
    } else {
      saveLobby(lobby, callback);
    }
  });
}

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
