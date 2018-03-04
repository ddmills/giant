import {store} from '../store/Store';
import ServerLatency from '../store/actions/server/ServerLatencyAction';
import ServerConnected from '../store/actions/server/ServerConnectedAction';
import ServerDisconnected from '../store/actions/server/ServerDisconnectedAction';
import Unauthenticate from '../store/actions/UnauthenticateAction';
import {createSocket} from './Socket';
import {isExpired} from '../utilities/Token';

let socket = null;

export const connect = (token) => {
  if (socket) {
    return socket;
  }

  socket = createSocket(token);

  let latencyTimeout;

  const getLatency = () => {
    const start = Date.now();

    socket.emit('latency', () => {
      store.dispatch(ServerLatency(Date.now() - start));

      if (isExpired(token)) {
        store.dispatch(Unauthenticate());
      } else {
        latencyTimeout = setTimeout(getLatency, 3000);
      }
    });
  };

  socket.on('disconnect', () => {
    clearTimeout(latencyTimeout);
    store.dispatch(ServerDisconnected());
  });

  socket.on('connect', () => {
    getLatency();
    store.dispatch(ServerConnected());
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
