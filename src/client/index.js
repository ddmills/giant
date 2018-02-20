import io from 'socket.io-client';

const socket = io();
const send = (message) => socket.emit('command', message);

send('hello');
send('this is a client');
