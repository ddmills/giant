import {
  LOBBY_LOADED,
  LOBBY_PLAYER_LEFT
} from '../actions/ActionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOBBY_LOADED:
      return {
        ...state,
        ...action.lobby,
      };
    case LOBBY_PLAYER_LEFT:
      return {
        ...state,
        lobby: {},
      };
    default:
      return {
        ...state,
      };
  }
};
