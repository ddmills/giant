import io from 'socket.io-client';

const socket = io();

socket.on('greet', () => console.log('server: greet'));

export const greet = () => socket.emit('greet');
export const send = (type, parameters) => socket.emit('command', {type, parameters});

