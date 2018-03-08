import {connect} from 'preact-redux';
import {store} from '../../store/Store';
import TokenPage from './TokenPage';
import SignIn from '../../store/actions/SignInAction';
import RedirectToLocation from '../../store/actions/router/RedirectToLocationAction';

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
      store.dispatch(RedirectToLocation(uri));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenPage);
