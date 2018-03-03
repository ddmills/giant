import {connect} from 'preact-redux';
import CreateGamePage from './CreateGamePage';

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGamePage);
