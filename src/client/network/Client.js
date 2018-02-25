import Store from '../store/Store';
import {CONNECTED, DICSCONNECTED, SERVER_LATENCY} from '../store/actions/ActionTypes';

export function listen(socket) {
  const getLatency = () => {
    const start = Date.now();

    socket.emit('latency', () => {
      Store.dispatch({
        type: SERVER_LATENCY,
        latency: Date.now() - start
      });
      setTimeout(getLatency, 3000);
    });
  };

  socket.on('disconnect', () => Store.dispatch({type: DICSCONNECTED}));
  socket.on('connect', () => {
    getLatency();
    Store.dispatch({type: CONNECTED});
  });
}
