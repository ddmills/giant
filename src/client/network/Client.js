import Store from '../store/Store';
import {SERVER_CONNECTED, SERVER_DISCONNECTED, SERVER_LATENCY} from '../store/actions/ActionTypes';

export function listen(socket) {
  let latencyTimeout;

  const getLatency = () => {
    const start = Date.now();

    socket.emit('latency', () => {
      Store.dispatch({
        type: SERVER_LATENCY,
        latency: Date.now() - start
      });
      latencyTimeout = setTimeout(getLatency, 2000);
    });
  };

  socket.on('disconnect', () => {
    clearTimeout(latencyTimeout);
    Store.dispatch({
      type: SERVER_DISCONNECTED
    });
  });

  socket.on('connect', () => {
    getLatency();
    Store.dispatch({
      type: SERVER_CONNECTED
    });
  });
}
