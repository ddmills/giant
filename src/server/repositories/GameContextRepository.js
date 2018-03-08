import {uuid} from '../utilities/Random';

const gameContexts = {};

export function save(gameContext, callback) {
  if (!gameContext.id) {
    gameContext.id = uuid();
  }

  gameContexts[gameContext.id] = gameContext;

  callback(undefined, gameContext);
}

export function get(gameContextId, callback) {
  callback(undefined, gameContexts[gameContextId]);
}

export function getAll(callback) {
  callback(undefined, Object.values(gameContexts));
}
