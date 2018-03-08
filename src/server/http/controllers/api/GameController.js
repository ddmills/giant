import {create as createGameContext} from '../../../domain/factories/GameContextFactory';
import {
  save as saveGameContext,
  get as getGameContext,
  getAll as getAllGameContexts
} from '../../../repositories/GameContextRepository';

export function create(request, response) {
  const gameContext = createGameContext(request.session.userId);

  saveGameContext(gameContext, (error) => {
    if (error) {
      response.status(500).json(error);
    } else {
      response.json(gameContext);
    }
  });
}

export function get(request, response) {
  getGameContext(request.params.id, (error, gameContext) => {
    if (error) {
      response.status(500).json(error);
    } else if (!gameContext) {
      response.status(404);
    } else {
      response.json(gameContext);
    }
  });
}

export function getAll(request, response) {
  getAllGameContexts((error, gameContexts) => {
    if (error) {
      response.status(500).json(error);
    } else {
      response.json(gameContexts);
    }
  });
}
