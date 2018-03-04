import {SIGN_IN} from './ActionTypes';
import {decode as decodeJWT} from 'jsonwebtoken';
import {connect} from '../../network/Client';

export default (token) => {
  const user = decodeJWT(token);
  connect(token);

  localStorage.setItem('token', token);

  return {
    type: SIGN_IN,
    token,
    user,
  };
};
