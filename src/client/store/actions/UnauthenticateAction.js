import {SIGN_OUT} from './ActionTypes';
import {disconnect} from '../../network/Client';

export default () => {
  disconnect();

  localStorage.removeItem('token');

  return {
    type: SIGN_OUT,
  };
};
