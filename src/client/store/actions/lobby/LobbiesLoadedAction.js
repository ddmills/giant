import {LOBBY_INDEX} from '../ActionTypes';

export default (lobbyCollection) => {
  return {
    type: LOBBY_INDEX,
    lobbyCollection,
  }
};
