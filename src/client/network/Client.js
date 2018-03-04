import {store} from '../store/Store';
import ServerLatency from '../store/actions/server/ServerLatencyAction';
import ServerConnected from '../store/actions/server/ServerConnectedAction';
import ServerDisconnected from '../store/actions/server/ServerDisconnectedAction';

export function listen(socket) {
  let latencyTimeout;

  const getLatency = () => {
    const start = Date.now();

    socket.emit('latency', () => {
      store.dispatch(ServerLatency(Date.now() - start));
      latencyTimeout = setTimeout(getLatency, 3000);
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
}
