import {LOBBY_PLAYER_LEFT} from '../ActionTypes';
import {leaveLobby} from '../../../network/Api';

export default (lobbyId) => {
  return (dispatch) => {
    leaveLobby(lobbyId, (lobby) => {
      dispatch({
        type: LOBBY_PLAYER_LEFT,
        lobby,
      });
    })
  };
}
