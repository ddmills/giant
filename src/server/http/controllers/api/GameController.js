import {create as createGameContext} from '../../../domain/factories/GameContextFactory';
import {
  save as saveGameContext,
  get as getGameContext,
  getAll as getAllGameContexts
} from '../../../repositories/GameContextRepository';
import {log, json} from '../../../utilities/Logger';

export function create(request, response) {
  const context = createGameContext(request.session.userId);
  saveGameContext(context);

  response.json(context);
}

export function get(request, response) {
  const context = getGameContext(request.params.id);

  if (context) {
    response.json(context);
  } else {
    response.status(404).json();
  }
}

export function getAll(request, response) {
  response.json(getAllGameContexts());
}
