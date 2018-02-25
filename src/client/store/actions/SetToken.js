import {RECIEVE_JWT_TOKEN} from './ActionTypes';

export default (token) => {
  return {
    type: 'RECIEVE_JWT_TOKEN',
    token,
  };
};
