import {uuid} from '../utilities/Random';

const sockets = {};

export function save(socketId, userId, callback = () =>{}) {
  sockets[socketId] = userId;

  callback(undefined, sockets[socketId]);
}

export function remove(socketId, callback = () =>{}) {
  delete sockets[socketId];

  callback(undefined);
}

export function get(socketId, callback = () =>{}) {
  callback(undefined, sockets[socketId]);
}

export function getAllForUser(userId, callback = () =>{}) {
  const socketIds = Object.entries(sockets)
    .filter((socket) => socket[1] === userId)
    .map((result) => result[0]);

  callback(undefined, socketIds);
}

export function getAll(callback = () =>{}) {
  callback(undefined, Object.values(sockets));
}
