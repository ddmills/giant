import {
  LOBBY_LOADED,
  LOBBY_LEAVE,
  LOBBY_ERROR,
  LOBBY_CLEAR_ERROR,
} from '../actions/ActionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOBBY_LOADED:
      return {
        ...state,
        current: action.lobby,
        error: undefined,
      };
    case LOBBY_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case LOBBY_CLEAR_ERROR:
      return {
        ...state,
        error: undefined,
      };
    case LOBBY_LEAVE:
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
