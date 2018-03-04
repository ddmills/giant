import {decode} from 'jsonwebtoken';

export const isExpired = (token) => {
  const expiration = decode(token).exp * 1000;
  const now = (new Date()).getTime();
  const timeLeft = expiration - now;

  return Boolean(timeLeft <= 0);
}
