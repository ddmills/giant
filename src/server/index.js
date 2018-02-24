import config from 'config';
import path from 'path';
import express from 'express';
import session from 'express-session';
import {Server} from 'http';
import WebRouter from './http/WebRouter';
import ApiRouter from './http/ApiRouter';
import SocketIO from 'socket.io';
import {log} from './utilities/Logger';

const app = express();
const server = Server(app);
const io = SocketIO(server);
const url = `${config.server.protocol}://${config.server.host}:${config.server.port}`;

app.use(session(config.session));
app.use('/', WebRouter);
app.use('/api', ApiRouter);
app.use('/client', express.static(path.join(__dirname, '..', 'client')));

io.on('connection', (socket) => {
  log('[connect]');

  socket.on('greet', (request) => {
    log('[greet]');
    socket.emit('greet');
  });

  socket.on('disconnect', () => {
    log('[disconnect]');
  });
});

server.listen(config.server.port, () => console.log(url));
