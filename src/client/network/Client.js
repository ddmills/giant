import Socket from './Socket';
import Store from '../store/Store';
import {CONNECTED, DICSCONNECTED} from '../store/actions/ActionTypes';

Socket.on('disconnect', () => Store.dispatch({type: DICSCONNECTED}));
Socket.on('connect', () => Store.dispatch({type: CONNECTED}));
