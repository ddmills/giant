import {connect} from 'preact-redux';
import AuthenticatedRoute from './AuthenticatedRoute';

const mapStateToProps = (state, props) => {
  return {
    path: props.path,
    component: props.component,
    authenticated: Boolean(state.auth.user),
  };
};

export default connect(mapStateToProps)(AuthenticatedRoute);
