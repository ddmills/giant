import {uuid} from '../utilities/Random';

const gameContexts = {};

export function save(gameContext, callback) {
  if (!gameContext.id) {
    gameContext.id = uuid();
  }

  gameContexts[gameContext.id] = gameContext;

  callback(gameContext);
}

export function get(gameContextId) {
  return gameContexts[gameContextId];
}

export function getAll() {
  return Object.values(gameContexts);
}
