import config from 'config';
import path from 'path';
import express from 'express';
import session from 'express-session';
import {Server} from 'http';
import WebRouter from './http/WebRouter';
import ApiRouter from './http/ApiRouter';

const app = express();
const server = Server(app);
const url = `${config.server.protocol}://${config.server.host}:${config.server.port}`;

app.use(session(config.session));
app.use('/', WebRouter);
app.use('/api', ApiRouter);
app.use('/client', express.static(path.join(__dirname, '..', 'client')));

server.listen(config.server.port, () => console.log(url));
