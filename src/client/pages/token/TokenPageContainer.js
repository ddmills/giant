import preact from 'preact';
import {connect} from 'preact-redux';
import TokenPage from './TokenPage';
import SignIn from '../../store/actions/SignInAction';
import {store} from '../../store/Store';
import {replace as GoToLocation} from 'react-router-redux';

const mapStateToProps = (state, props) => {
  const targetUri = props.match.params.target ? decodeURIComponent(props.match.params.target) : '/';

  return {
    targetUri,
    token: props.match.params.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (token) => {
      store.dispatch(SignIn(token));
    },
    redirect: (uri) => {
      store.dispatch(GoToLocation(uri));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenPage);
