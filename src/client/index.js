import io from 'socket.io-client';

const socket = io();
const cmd = (type, parameters) => socket.emit('command', {type, parameters});

window.cmd = cmd;
window.endTurn = () => cmd('END_TURN');
window.buyHero = (id) => cmd('PURCHASE_HERO', {cardId : id});
window.buyBlueprint = (id) => cmd('PURCHASE_BLUEPRINT', {cardId : id});
