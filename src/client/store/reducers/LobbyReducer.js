import {LOBBY_LOADED} from '../actions/ActionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOBBY_LOADED:
      return {
        ...state,
        ...action.lobby
      };
    default:
      return {
        ...state,
      };
  }
};
