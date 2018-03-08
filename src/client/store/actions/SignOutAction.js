import GoToLocation from '../../store/actions/router/GoToLocationAction';
import {disconnect} from '../../network/Client';
import Unauthenticate from './UnauthenticateAction';

export default () => {
  return (dispatch) => {
    dispatch(Unauthenticate());
    dispatch(GoToLocation('/'));
  };
};
