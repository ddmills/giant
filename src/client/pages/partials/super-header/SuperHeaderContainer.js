import {connect} from 'preact-redux';
import SuperHeader from './SuperHeader';
import {store} from '../../../store/Store';
import SignOut from '../../../store/actions/SignOutAction';

const mapStateToProps = (state) => {
  return {
    displayName: state.auth.user ? state.auth.user.displayName : ''
  };
};

export default connect(mapStateToProps)(SuperHeader);
