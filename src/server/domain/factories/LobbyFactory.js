import Lobby from '../Lobby';

export function create(name) {
  return Lobby.create({
    name,
  });
}
