import preact from 'preact';
import {connect} from 'preact-redux';
import SignInPage from './SignInPage';

const mapStateToProps = (state) => {
  return {
    authenticated: Boolean(state.auth.user)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
