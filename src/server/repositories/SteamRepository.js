import config from 'config';
import {get} from 'axios';

function userURI(steamId) {
  const base = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/';
  const encodedId = encodeURIComponent(steamId);

  return `${base}?key=${config.steam.key}&steamids=${encodedId}`;
}

export function getSteamUser(steamId, callback) {
  get(userURI(steamId))
    .then((response) => callback(undefined, response.data.response.players[0]))
    .catch((error) => callback);
}
