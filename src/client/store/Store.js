import {compose, createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import ReduxThunk from 'redux-thunk';
import DefaultState from './DefaultState';
import {history} from './History';
import reducer from './reducers/RootReducer';
import {isExpired} from '../utilities/Token';

const initialState = JSON.parse(localStorage.getItem('store')) || DefaultState;

const middleware = applyMiddleware(
  ReduxThunk,
  routerMiddleware(history)
);

export const store = createStore(reducer, initialState, middleware);

store.subscribe(() => {
  // localStorage.setItem('store', JSON.stringify(store.getState()));
});

window.store = store;
