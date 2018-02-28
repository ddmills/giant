import preact from 'preact';
import {connect} from 'preact-redux';
import SignInPage from './SignInPage';

const mapStateToProps = (state) => {
  return {
    isAlreadySignedIn: Boolean(state.user)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
