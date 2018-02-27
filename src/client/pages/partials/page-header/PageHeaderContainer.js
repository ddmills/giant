import {connect} from 'preact-redux';
import PageHeader from './PageHeader';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
