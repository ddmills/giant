import {create as createLobby} from '../domain/factories/LobbyFactory';
import {get as getAccount} from '../repositories/AccountRepository';
import {create as createException} from '../services/ExceptionService';
import {create as createPlayer} from '../domain/factories/PlayerFactory';
import {create as createBot} from '../domain/factories/BotFactory';
import * as LobbyRepository from '../repositories/LobbyRepository';

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
          callback(createException('Lobby is full', 405));
          return;
        }

        if (lobby.isDisbanded) {
          callback(createException('Lobby is disbanded', 410));
          return;
        }

        if (lobby.isStarted) {
          callback(createException('Lobby has already started', 405));
          return;
        }

        const player = createPlayer(account);

        lobby.addPlayer(player);

        LobbyRepository.save(lobby, callback);
      });
    });
  });
}

export function start(userId, callback) {
  LobbyRepository.getForUser(userId, (error, lobby) => {
    if (error) {
      callback(error);
      return;
    }

    if (!lobby) {
      callback(createException('Lobby not found', 404));
      return;
    }

    if (lobby.isDisbanded) {
      callback(createException('Lobby is disbanded', 410));
      return;
    }

    if (lobby.isStarted) {
      callback(createException('Lobby has already started', 405, false));
      return;
    }

    if (lobby.numberOfPlayers < 2) {
      callback(createException('Not enough players', 405, false));
      return;
    }

    if (lobby.ownerId !== userId) {
      callback(createException('User does not have permission to start the lobby', 403));
      return;
    }

    lobby.start();

    LobbyRepository.save(lobby, callback);
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

    removePlayer(userId, lobby, callback);
  });
}

export function removePlayer(userId, lobby, callback) {
  lobby.removePlayerById(userId);

  if (lobby.ownerId === userId) {
    lobby.isDisbanded = true;
  }

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

    if (lobby.isStarted) {
      callback(createException('Lobby has already started', 405));
      return;
    }

    const bot = createBot();
    const player = createPlayer(bot);

    lobby.addPlayer(player);

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

      const lobby = createLobby(`${account.displayName}'s game`);
      const player = createPlayer(account);

      lobby.addPlayer(player);
      lobby.ownerId = account.id;

      LobbyRepository.save(lobby, callback);
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

export function getAllPublic(callback) {
  LobbyRepository.getAll((error, lobbies) => {
    if (error) {
      callback(error);
      return;
    }

    const publicLobbies = lobbies
      .filter((lobby) => lobby.isPublic)
      .filter((lobby) => !lobby.isDisbanded);

    callback(undefined, publicLobbies);
  });
}

export function getForUserId(userId, callback) {
  LobbyRepository.getForUser(userId, callback);
}
