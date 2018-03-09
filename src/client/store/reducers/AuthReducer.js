import {
  SIGN_IN,
  SIGN_OUT,
} from '../actions/ActionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        token: action.token,
        user: action.user,
      };
    case SIGN_OUT:
      return {
        ...state,
        user: undefined,
        token: undefined,
      };
    default:
      return {
        ...state,
      };
  }
};
