import {
  LOBBY_LOADED,
  LOBBY_PLAYER_LEFT,
  LOBBY_LOADED_ERROR,
} from '../actions/ActionTypes';

export default (state = undefined, action) => {
  switch (action.type) {
    case LOBBY_LOADED:
      return {
        ...state,
        current: action.lobby,
        error: undefined,
      };
    case LOBBY_LOADED_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case LOBBY_PLAYER_LEFT:
      return {
        ...state,
        current: undefined,
      };
    default:
      return {
        ...state,
      };
  }
};
