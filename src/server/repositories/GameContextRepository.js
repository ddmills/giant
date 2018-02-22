import {uuid} from '../utilities/Random';

const gameContexts = {};

export function save(gameContext) {
  if (!gameContext.id) {
    gameContext.id = uuid();
  }

  gameContexts[gameContext.id] = gameContext;
}

export function get(gameContextId) {
  return gameContexts[gameContextId];
}
