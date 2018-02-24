import {uuid} from '../utilities/Random';

const users = {};

export function save(user) {
  if (!user.id) {
    user.id = uuid();
  }

  users[user.id] = user;
}

export function get(id) {
  return users[id];
}
