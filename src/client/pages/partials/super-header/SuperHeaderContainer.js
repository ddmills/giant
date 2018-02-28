import {connect} from 'preact-redux';
import SuperHeader from './SuperHeader';

const mapStateToProps = (state) => {
  return {
    displayName: state.user ? state.user.displayName : ''
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuperHeader);
