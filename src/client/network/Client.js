import {store} from '../store/Store';
import ServerLatency from '../store/actions/server/ServerLatencyAction';
import ServerConnected from '../store/actions/server/ServerConnectedAction';
import ServerDisconnected from '../store/actions/server/ServerDisconnectedAction';
import Unauthenticate from '../store/actions/UnauthenticateAction';
import SignIn from '../store/actions/SignInAction';
import {createSocket, refreshSocketToken} from './Socket';
import {isExpired} from '../utilities/Token';

let socket = null;

export const connect = (token) => {
  if (socket) {
    return socket;
  }

  socket = createSocket(token);

  let latencyTimeout;
  let refreshTimeout;

  const listenLatency = () => {
    const start = Date.now();

    socket.emit('latency', () => {
      store.dispatch(ServerLatency(Date.now() - start));
      latencyTimeout = setTimeout(listenLatency, 1000);
    });
  };

  const listenRefresh = () => {
    socket.refreshToken((newToken) => {
      store.dispatch(SignIn(newToken));
      refreshTimeout = setTimeout(listenRefresh, 60000);
    });
  };

  socket.on('disconnect', () => {
    clearTimeout(latencyTimeout);
    clearTimeout(refreshTimeout);
    store.dispatch(ServerDisconnected());
  });

  socket.on('connect', () => {
    listenLatency();
    listenRefresh();
    store.dispatch(ServerConnected());
  });

  socket.on('error', (error) => {
    if (error.type === 'UnauthorizedError' || error.code === 'invalid_token') {
      store.dispatch(Unauthenticate());
    }
  });

  return socket;
}

export const disconnect = () => {
  if (!socket) {
    return;
  }

  socket.disconnect();
  socket = null;
}
