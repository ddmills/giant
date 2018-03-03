import {connect} from 'preact-redux';
import RequireAuthentication from './RequireAuthentication';

const mapStateToProps = (state) => {
  return {
    authenticated: Boolean(state.user)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  console.log(ownProps);
  return stateProps;
}

export default connect(mapStateToProps, () => {}, mergeProps)(RequireAuthentication);
