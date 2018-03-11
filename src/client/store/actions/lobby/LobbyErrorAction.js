import {LOBBY_ERROR} from '../ActionTypes';

export default (error) => {
  return {
    type: LOBBY_ERROR,
    error,
  };
}
