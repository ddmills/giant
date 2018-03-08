import {LOBBY_LOADED} from '../ActionTypes';
import {getLobby} from '../../../network/Api';

export default (id) => {
  return (dispatch) => {
    getLobby(id, (lobby) => {
      dispatch({
        type: LOBBY_LOADED,
        lobby
      });
    })
  };
}
