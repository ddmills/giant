import {SERVER_LATENCY} from '../ActionTypes';

export default (latency) => {
  return {
    type: SERVER_LATENCY,
    latency
  };
}
