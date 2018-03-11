import {LOBBY_LEAVE} from '../ActionTypes';

export default (lobbyId) => {
  return {
    type: LOBBY_LEAVE,
  };
}
