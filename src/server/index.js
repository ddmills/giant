import config from 'config';
import express from 'express';
import path from 'path';
import {Server} from 'http';
import SocketIO from 'socket.io';
import {create as createGameContext} from './domain/factories/GameContextFactory';
import {save as saveGameContext} from './repositories/GameContextRepository';
import {create as createCommand} from './commands/CommandFactory';
import {log, json} from './utility/Logger';

const app = express();
const server = Server(app);
const io = SocketIO(server);

app.use('/client', express.static(path.join(__dirname, '..', 'client')));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('[connect]');

  socket.on('command', (command) => {
    console.log('[command]', command);
  });

  socket.on('disconnect', () => {
    console.log('[disconnect]');
  });
});

server.listen(config.server.port, () => console.log(`${config.server.protocol}://${config.server.host}:${config.server.port}`));

const game = createGameContext('player1', 'player2');

log('before', game.id);
saveGameContext(game);
log('after', game.id);

game.setup();

const p1 = game.players[0];
const p2 = game.players[1];

const endTurn = createCommand(game.id, p1.id, 'END_TURN');

if (endTurn.authorize()) {
  endTurn.execute();
}
