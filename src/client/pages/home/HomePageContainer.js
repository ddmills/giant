import {connect} from 'preact-redux';
import HomePage from './HomePage';

const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: Boolean(state.auth.user),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
