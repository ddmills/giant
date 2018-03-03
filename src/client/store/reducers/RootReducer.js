import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import AuthReducer from './AuthReducer';
import ServerReducer from './ServerReducer';

export default combineReducers({
  auth: AuthReducer,
  server: ServerReducer,
  router: routerReducer
});
