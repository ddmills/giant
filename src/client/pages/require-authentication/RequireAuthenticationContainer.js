import {connect} from 'preact-redux';
import RequireAuthentication from './RequireAuthentication';

const mapStateToProps = (state) => {
  return {
    authenticated: Boolean(state.user)
  };
};

export default connect(mapStateToProps)(RequireAuthentication);
