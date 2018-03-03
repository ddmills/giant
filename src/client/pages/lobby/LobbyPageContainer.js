import {connect} from 'preact-redux';
import LobbyPage from './LobbyPage';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LobbyPage);
