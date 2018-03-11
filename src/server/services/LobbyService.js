import {create as createLobby} from '../domain/factories/LobbyFactory';
import {get as getAccount} from '../repositories/AccountRepository';
import {create as createException} from '../services/ExceptionService';
import * as LobbyRepository from '../repositories/LobbyRepository';

export function join(userId, lobbyId, callback) {
  getAccount(userId, (error, account) => {
    if (error) {
      callback(error);
      return;
    }

    LobbyRepository.get(lobbyId, (error, lobby) => {
      if (error) {
        callback(error);
        return;
      }

      lobby.addPlayer(account);

      LobbyRepository.save(lobby, callback);
    });
  });
}

export function leave(userId, callback) {
  LobbyRepository.getForUser(userId, (error, lobby) => {
    if (error) {
      callback(error);
      return;
    }

    if (!lobby) {
      callback(createException('Lobby not found', 404));
      return;
    }

    lobby.removePlayerById(userId);

    LobbyRepository.save(lobby, callback);
  });
}

export function removePlayer(userId, lobby, callback) {
  lobby.removePlayerById(userId);

  LobbyRepository.save(lobby, callback);
}

export function create(userId, callback) {
  LobbyRepository.getForUser(userId, (error, lobby) => {
    if (error) {
      callback(error);
      return;
    }

    if (lobby) {
      callback(createException('Already in a lobby', 409));
      return;
    }

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

        LobbyRepository.save(lobby, callback);
      });
    });
  });
}

export function get(lobbyId, callback) {
  LobbyRepository.get(lobbyId, (error, lobby) => {
    if (error) {
      callback(error);
      return;
    }

    if (!lobby) {
      callback(createException('Lobby not found', 404));
      return;
    }

    callback(undefined, lobby);
  });
}

export function getForUserId(userId, callback) {
  LobbyRepository.getForUser(userId, callback);
}
