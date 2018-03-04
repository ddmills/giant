import {connect} from 'preact-redux';
import PageFooter from './PageFooter';
import {store} from '../../../store/Store';
import SignOut from '../../../store/actions/SignOutAction';

const mapStateToProps = (state) => {
  return {
    displayName: state.auth.user ? state.auth.user.displayName : ''
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(SignOut()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageFooter);
