import config from 'config';
import express from 'express';
import path from 'path';
import {Server} from 'http';
import SocketIO from 'socket.io';
import {create as createGameContext} from './domain/factories/GameContextFactory';
import {save as saveGameContext} from './repositories/GameContextRepository';
import {handle as handleRequest} from './commands/CommandHandler';
import {log, info, warn, json} from './utilities/Logger';

const app = express();
const server = Server(app);
const io = SocketIO(server);

app.use('/client', express.static(path.join(__dirname, '..', 'client')));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

const game = createGameContext('player1', 'player2');

saveGameContext(game);

game.setup();

json(game.heroRow);

io.on('connection', (socket) => {
  log('[connect]');

  socket.on('command', (request) => {
    handleRequest(game.id, game.currentPlayerId, request);
  });

  socket.on('disconnect', () => {
    log('[disconnect]');
  });
});

server.listen(config.server.port, () => console.log(`${config.server.protocol}://${config.server.host}:${config.server.port}`));


