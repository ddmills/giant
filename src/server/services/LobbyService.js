import {create as createLobby} from '../domain/factories/LobbyFactory';
import {get as getAccount} from '../repositories/AccountRepository';
import {create as createException} from '../services/ExceptionService';
import * as LobbyRepository from '../repositories/LobbyRepository';
import Bot from '../domain/Bot';

export function join(userId, lobbyId, callback) {
  getAccount(userId, (error, account) => {
    if (error) {
      callback(error);
      return;
    }

    LobbyRepository.getForUser(userId, (error, lobby) => {
      if (error) {
        callback(error);
        return;
      }

      if (lobby) {
        if (lobby.id !== lobbyId) {
          callback(createException('Already in a different lobby', 409, false));
          return;
        } else {
          callback(undefined, lobby);
          return;
        }
      }

      LobbyRepository.get(lobbyId, (error, lobby) => {
        if (error) {
          callback(error);
          return;
        }

        if (!lobby) {
          callback(createException('Lobby not found', 404));
          return;
        }

        if (lobby.isFull) {
          callback(createException('Lobby is full', 403));
          return;
        }

        if (lobby.isDisbanded) {
          callback(createException('Lobby is disbanded', 404));
          return;
        }

        lobby.addPlayer(account);

        LobbyRepository.save(lobby, callback);
      });
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

    if (lobby.ownerId === userId) {
      lobby.isDisbanded = true;
    }

    LobbyRepository.save(lobby, callback);
  });
}

export function removePlayer(userId, lobby, callback) {
  lobby.removePlayerById(userId);

  LobbyRepository.save(lobby, callback);
}

export function addBot(userId, callback) {
  LobbyRepository.getForUser(userId, (error, lobby) => {
    if (error) {
      callback(error);
      return;
    }

    if (!lobby) {
      callback(createException('Lobby not found', 404));
      return;
    }

    if (lobby.ownerId !== userId) {
      callback(createException('Must be the owner of the lobby to add a bot', 401, false));
      return;
    }

    if (lobby.isFull) {
      callback(createException('Lobby is full', 403, false));
      return;
    }

    lobby.addPlayer(Bot.create());

    LobbyRepository.save(lobby, callback);
  });
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
