import {compose, createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk';
import {CONNECTED, DICSCONNECTED, INCREMENT, DECREMENT} from './actions/ActionTypes';
import DefaultState from './DefaultState';

const initialState = JSON.parse(localStorage.getItem('store')) || DefaultState;

initialState.connected = false;

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
      };
    case DICSCONNECTED:
      return {
        ...state,
        connected: false,
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
