import {create as createLobby} from '../domain/factories/LobbyFactory';
import {get as getAccount} from '../repositories/AccountRepository';
import {create as createException, createFatal as createFatalException} from '../services/ExceptionService';
import {create as createPlayer} from '../domain/factories/PlayerFactory';
import {create as createBot} from '../domain/factories/BotFactory';
import PurchaseBlueprintCommand from '../commands/PurchaseBlueprintCommand';
import PurchaseHeroCommand from '../commands/PurchaseHeroCommand';
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
          callback(createException('Already in a different lobby', 409));
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
          callback(createFatalException('Lobby not found', 404));
          return;
        }

        if (lobby.isFull) {
          callback(createFatalException('Lobby is full', 405));
          return;
        }

        if (lobby.isDisbanded) {
          callback(createFatalException('Lobby is disbanded', 410));
          return;
        }

        if (lobby.isStarted) {
          callback(createFatalException('Lobby has already started', 405));
          return;
        }

        const player = createPlayer(account);

        lobby.addPlayer(player);

        LobbyRepository.save(lobby, callback);
      });
    });
  });
}

export function setup(userId, callback) {
  LobbyRepository.getForUser(userId, (error, lobby) => {
    if (error) {
      callback(error);
      return;
    }

    if (!lobby) {
      callback(createFatalException('Lobby not found', 404));
      return;
    }

    if (lobby.isDisbanded) {
      callback(createFatalException('Lobby is disbanded', 410));
      return;
    }

    if (lobby.isStarted) {
      callback(createException('Lobby has already started', 405));
      return;
    }

    if (lobby.numberOfPlayers < 2) {
      callback(createException('Not enough players', 405));
      return;
    }

    if (lobby.ownerId !== userId) {
      callback(createFatalException('User does not have permission to start the lobby', 403));
      return;
    }

    lobby.setup();

    LobbyRepository.save(lobby, callback);
  });
}


export function start(lobbyId, callback) {
  LobbyRepository.get(lobbyId, (error, lobby) => {
    if (error) {
      callback(error);
      return;
    }

    if (!lobby) {
      callback(createFatalException('Lobby not found', 404));
      return;
    }

    if (lobby.isDisbanded) {
      callback(createFatalException('Lobby is disbanded', 410));
      return;
    }

    if (!lobby.isStarted) {
      callback(createException(`Lobby hasn't started yet`, 405));
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
      callback(createFatalException('Lobby not found', 404));
      return;
    }

    removePlayer(userId, lobby, callback);
  });
}

export function endTurn(userId, callback) {
  LobbyRepository.getForUser(userId, (error, lobby) => {
    if (error) {
      callback(error);
      return;
    }

    if (!lobby) {
      callback(createFatalException('Lobby not found', 404));
      return;
    }

    if (lobby.currentPlayer.account.id !== userId) {
      callback(createException('Cannot end someone elses turn', 403));
      return;
    }

    lobby.endTurn();

    LobbyRepository.save(lobby, callback);
  });
}

export function buyBlueprint(userId, cardId, callback) {
  LobbyRepository.getForUser(userId, (error, lobby) => {
    if (error) {
      callback(error);
      return;
    }

    if (!lobby) {
      callback(createFatalException('Lobby not found', 404));
      return;
    }

    const card = lobby.getCard(cardId);
    const player = lobby.getPlayerByAccountId(userId);
    const command = PurchaseBlueprintCommand.create(lobby, player, card);

    if (!command.authorize()) {
      callback(createException('Unauthorized action', 403), lobby);
      return;
    }

    command.perform();

    LobbyRepository.save(lobby, callback);
  });
}

export function buyHero(userId, cardId, callback) {
  LobbyRepository.getForUser(userId, (error, lobby) => {
    if (error) {
      callback(error);
      return;
    }

    if (!lobby) {
      callback(createFatalException('Lobby not found', 404));
      return;
    }

    const card = lobby.getCard(cardId);
    const player = lobby.getPlayerByAccountId(userId);
    const command = PurchaseHeroCommand.create(lobby, player, card);

    if (!command.authorize()) {
      callback(createException('Unauthorized action', 403), lobby);
      return;
    }

    command.perform();

    LobbyRepository.save(lobby, callback);
  });
}

export function removePlayer(userId, lobby, callback) {
  lobby.removePlayerByAccountId(userId);

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
      callback(createFatalException('Lobby not found', 404));
      return;
    }

    if (lobby.ownerId !== userId) {
      callback(createException('Must be the owner of the lobby to add a bot', 401));
      return;
    }

    if (lobby.isFull) {
      callback(createException('Lobby is full', 403));
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
      callback(createFatalException('Already in a lobby', 409));
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
      callback(createFatalException('Lobby not found', 404));
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
