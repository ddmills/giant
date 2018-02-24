import config from 'config';
import app from './app';
import {info} from './utilities/Logger';
import {install as installSourceMapSupport} from 'source-map-support';

installSourceMapSupport();

app.listen(config.server.port, () => info('SERVING'));
