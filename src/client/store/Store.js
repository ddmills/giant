import {compose, createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk';
import {
  SIGN_IN,
  SIGN_OUT,
  SERVER_CONNECTED,
  SERVER_DISCONNECTED,
  SERVER_LATENCY,
  INCREMENT,
  DECREMENT
} from './actions/ActionTypes';
import DefaultState from './DefaultState';
import {listen} from '../network/Client';
import Socket from '../network/Socket';

const initialState = JSON.parse(localStorage.getItem('store')) || DefaultState;

initialState.connected = false;
initialState.latency = 0;

const store = createStore((
  state = initialState,
  action
) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case SIGN_IN:
      return {
        ...state,
        token: action.token,
        user: action.user,
      };
    case SIGN_OUT:
      return {
        ...state,
        user: undefined,
        token: undefined,
      };
    case SERVER_CONNECTED:
      return {
        ...state,
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
      return {
        ...state
      };
  }
}, applyMiddleware(ReduxThunk));

store.subscribe(() => {
  localStorage.setItem('store', JSON.stringify(store.getState()))
});

listen(Socket);

export default store;
