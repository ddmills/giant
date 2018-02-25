import axios from 'axios';
import Store from '../store/Store';

export function request(config, callback) {
  return axios({
    ...config,
    params: {
      ...config.params,
      token: Store.token,
    }
  }).then((response) => {
    callback(undefined, response.data, response);
  }).catch((error) => {
    callback(error, undefined, response);
  });
}

export function unsignedRequest(config, callback) {
  return axios({
    ...config,
  }).then((response) => {
    callback(undefined, response.data, response);
  }).catch((error) => {
    callback(error, undefined, response);
  });
}
