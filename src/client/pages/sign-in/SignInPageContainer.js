import preact from 'preact';
import {connect} from 'preact-redux';
import SignInPage from './SignInPage';
import {push as GoToLocation} from 'react-router-redux';
import {store} from '../../store/Store';

const mapStateToProps = (state, props) => {
  return {
    targetUri: props.location && props.location.pathname || '/',
    authenticated: Boolean(state.auth.user),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    redirect: (uri) => {
      store.dispatch(GoToLocation(uri))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
