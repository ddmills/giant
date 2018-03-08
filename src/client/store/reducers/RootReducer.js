import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import AuthReducer from './AuthReducer';
import ServerReducer from './ServerReducer';
import LobbyReducer from './LobbyReducer';

export default combineReducers({
  auth: AuthReducer,
  server: ServerReducer,
  lobby: LobbyReducer,
  router: routerReducer,
});
