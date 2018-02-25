import jwt from 'jsonwebtoken';
import config from 'config';
import {log, json} from '../../../utilities/Logger';

export function signIn(request, response) {
  // todo: authenticate
  const profile = {
    username: 'ddmills',
    id: '1234567890',
  };

  const token = jwt.sign(profile, config.jwt.secret, {
    expiresIn: config.jwt.expiry
  });

  response.json({
    token
  });
}
