import config from 'config';
import path from 'path';
import express from 'express';
import session from 'express-session';
import {Server} from 'http';
import WebRouter from './http/WebRouter';
import ApiRouter from './http/ApiRouter';
import {requireAuthentication} from './http/middleware/Authentication';

const app = express();
const server = Server(app);

app.use(session(config.session));
app.use('/', WebRouter);
app.use('/api', requireAuthentication, ApiRouter);
app.use('/client', express.static(path.join(__dirname, '..', 'client')));

server.listen(config.server.port, () => console.log(`${config.server.protocol}://${config.server.host}:${config.server.port}`));
