import {LOBBY_LOADED, LOBBY_LOADED_ERROR} from '../ActionTypes';
import {getLobby} from '../../../network/Api';

export default (lobbyId) => {
  return (dispatch) => {
    getLobby(lobbyId, (error, lobby) => {
      if (error) {
        dispatch({
          type: LOBBY_LOADED_ERROR,
          error
        });
        return;
      }

      dispatch({
        type: LOBBY_LOADED,
        lobby
      });
    })
  };
}
