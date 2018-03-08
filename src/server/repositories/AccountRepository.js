import {uuid} from '../utilities/Random';
import {getSteamUser} from './SteamRepository';
import Account from '../domain/Account';

const users = {};

export function save(user) {
  if (!user.id) {
    user.id = uuid();
  }

  users[user.id] = user;
}

export function get(steamId, callback) {
  getSteamUser(steamId, (error, steamUser) => {
    if (error) {
      callback(error);
      return;
    }

    callback(undefined, Account.create({
      id: steamUser.steamid,
      steamId: steamUser.steamid,
      name: steamUser.realname,
      displayname: steamUser.personaname,
      avatar: steamUser.avatar,
      steamUrl: steamUser.profileurl,
    }));
  });
}
