import config from 'config';
import app from './app';
import {info} from './utilities/Logger';
import {install as installSourceMapSupport} from 'source-map-support';

installSourceMapSupport();

// hack for windows 10 localhost delay (https://github.com/socketio/socket.io/issues/3100)
if (config.env === 'development') {
  setInterval(() => {}, 50);
}

app.listen(config.server.port, () => info('SERVING'));
