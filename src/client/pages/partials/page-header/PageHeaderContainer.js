import {connect} from 'preact-redux';
import PageHeader from './PageHeader';

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(PageHeader);
