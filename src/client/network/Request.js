import axios from 'axios';
import {store} from '../store/Store';

export function request(config, callback) {
  return axios({
    ...config,
    params: {
      ...config.params,
      token: store.getState().auth.token,
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
