import config from 'config';
import jwt from 'jsonwebtoken';
import {warn} from './Logger';

export const refreshToken = (token, callback) => {
  jwt.verify(token, config.jwt.secret, (error, decoded) => {
    if (error) {
      warn('Issue refreshing token...', error);
      return token;
    } else {
      delete decoded.iat;
      delete decoded.exp;
      delete decoded.nbf;
      delete decoded.jti;

      const newToken = jwt.sign(decoded, config.jwt.secret, {
        expiresIn: config.jwt.expiry
      });

      callback(newToken);
    }
  });
}
