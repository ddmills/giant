import {create as createGameContext} from '../domain/factories/GameContextFactory';
import {
  save as saveGameContext,
  get as getGameContext,
  getAll as getAllGameContexts
} from '../repositories/GameContextRepository';

export function createGame(user, properties, callback) {
  const game = createGameContext(user.id);

  saveGameContext(game, () => {
    callback(undefined, game);
  });
}

export function joinGame(user, gameContextId, callback) {
  const game = getGameContext(gameContextId);

  // game.addPlayer(user);
  // saveGameContext(game);

  callback(game);
}
