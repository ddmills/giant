import {LOBBY_LOADED} from '../ActionTypes';

export default (lobby) => {
  return {
    type: LOBBY_LOADED,
    lobby,
  };
}
