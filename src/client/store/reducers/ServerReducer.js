import {
  SERVER_CONNECTED,
  SERVER_DISCONNECTED,
  SERVER_LATENCY
} from '../actions/ActionTypes';

const defaults = {
  connected: false,
  latency: 100,
};

export default (state = defaults, action) => {
  switch (action.type) {
    case SERVER_CONNECTED:
      return {
        connected: true,
        latency: 0,
      };
    case SERVER_DISCONNECTED:
      return {
        ...state,
        connected: false,
        latency: 0,
      };
    case SERVER_LATENCY:
      return {
        ...state,
        latency: action.latency,
      };
    default:
      return state;
  }
};
