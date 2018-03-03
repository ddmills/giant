import preact from 'preact';
import {connect} from 'preact-redux';
import TokenPage from './TokenPage';
import SignIn from '../../store/actions/SignInAction';
import {store} from '../../store/Store';
import {push as GoToLocation} from 'react-router-redux';

const mapStateToProps = (state, props) => {
  return {
    targetUri: '/',
    token: props.match.params.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (token) => {
      store.dispatch(SignIn(token));
    },
    redirect: (url) => {
      store.dispatch(GoToLocation(url));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenPage);
