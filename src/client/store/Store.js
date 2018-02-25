import {compose, createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk';
import {CONNECTED, DICSCONNECTED, SERVER_LATENCY, INCREMENT, DECREMENT} from './actions/ActionTypes';
import DefaultState from './DefaultState';

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
    case CONNECTED:
      return {
        ...state,
        connected: true,
        latency: 0,
      };
    case DICSCONNECTED:
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

export default store;
