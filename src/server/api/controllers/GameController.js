import {create as createGameContext} from '../../domain/factories/GameContextFactory';
import {save as saveGameContext} from '../../repositories/GameContextRepository';
import {log, json} from '../../utilities/Logger';

export function create(request, response) {
  response.send({'hello': 'world'});
}

export function get(request, response) {
  response.send({'hello': 'worldzz'});
}

export function getAll(request, response) {
  log('hello');
  response.send(request.session);
}

