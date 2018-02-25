import jwt from 'jsonwebtoken';
import config from 'config';
import {log, json} from '../../../utilities/Logger';

export function signIn(request, response) {
  const profile = request.user;
  const token = jwt.sign(profile, config.jwt.secret, {
    expiresIn: config.jwt.expiry
  });

  response.redirect(`/token/${token}`);
}
