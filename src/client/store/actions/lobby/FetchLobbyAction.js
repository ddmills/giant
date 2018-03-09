import {LOBBY_LOADED} from '../ActionTypes';
import {getLobby} from '../../../network/Api';

export default (lobbyId) => {
  return (dispatch) => {
    getLobby(lobbyId, (lobby) => {
      dispatch({
        type: LOBBY_LOADED,
        lobby
      });
    })
  };
}
