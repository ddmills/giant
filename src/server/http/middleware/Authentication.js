import {verify} from 'jsonwebtoken';
import config from 'config';

export function requireAuthentication(request, response, next) {
  verify(request.query.token, config.jwt.secret, (error, decoded) => {
    if (error) {
      response.status(401).json({
        error: error.name,
        message: error.message,
      });
    } else {
      request.user = decoded;

      next();
    }
  });
}
