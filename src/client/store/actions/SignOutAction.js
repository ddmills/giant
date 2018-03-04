import {push as GoToLocation} from 'react-router-redux';
import {disconnect} from '../../network/Client';
import Unauthenticate from './UnauthenticateAction';

export default () => {
  return (dispatch) => {
    dispatch(Unauthenticate());
    dispatch(GoToLocation('/'));
  };
};
