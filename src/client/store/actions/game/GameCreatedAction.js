import {GAME_CREATED} from '../ActionTypes';

export default (game) => {
  return {
    type: GAME_CREATED,
    game
  }
}
