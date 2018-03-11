import {connect} from 'preact-redux';
import PageFooter from './PageFooter';
import {store} from '../../../store/Store';

const mapStateToProps = (state) => {
  return {
    displayName: state.auth.user ? state.auth.user.displayName : '',
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageFooter);
