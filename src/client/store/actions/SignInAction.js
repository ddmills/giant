import {SIGN_IN} from './ActionTypes';
import {decode as decodeJWT} from 'jsonwebtoken';

export default (token) => {
  const user = decodeJWT(token);

  return {
    type: SIGN_IN,
    token,
    user,
  };
};
