import {SIGN_OUT} from './ActionTypes';
import {push as GoToLocation} from 'react-router-redux';

export default () => {
  return (dispatch) => {
    dispatch({
      type: SIGN_OUT,
    });
    dispatch(GoToLocation('/'));
  };
};
