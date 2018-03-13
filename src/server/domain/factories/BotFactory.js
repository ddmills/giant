import Player from '../Player';
import {uuid} from '../../utilities/Random';
import Bot from '../Bot';

export function create() {
  return Bot.create({
    id: uuid(),
  });
};
