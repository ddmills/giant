import Lobby from '../Lobby';

export function create(user, callback) {
  callback(undefined, Lobby.create({
    ownerId: user.id,
    players: [user],
    name: `${user.displayname}'s game`,
  }));
}
