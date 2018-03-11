import GoToLocation from '../../store/actions/router/GoToLocationAction';
import Unauthenticate from './UnauthenticateAction';

export default () => {
  return (dispatch) => {
    dispatch(Unauthenticate());
    dispatch(GoToLocation('/'));
  };
};
