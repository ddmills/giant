import {LOBBY_LOADED} from '../ActionTypes';
import {joinLobby} from '../../../network/Api';

export default (lobbyId) => {
  return (dispatch) => {
    joinLobby(lobbyId, (lobby) => {
      dispatch({
        type: LOBBY_PLAYER_JOINED,
        lobby
      });
    })
  };
}
