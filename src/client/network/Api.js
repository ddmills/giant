import {socket} from './Client';

export function createGame(properties, callback) {
  console.log('create game');
  socket.emit('game:create', properties, callback);
}
