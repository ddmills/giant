import Player from '../Player';
import {uuid} from '../../utilities/Random';

export function create(account) {
  return Player.create({
    id: uuid(),
    account,
  });
};
