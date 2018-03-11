import {connect} from 'preact-redux';
import LobbyCreatePage from './LobbyCreatePage';
import GoToLocation from '../../store/actions/router/GoToLocationAction';
import {createLobby} from '../../network/Api';
import ClearLobbyError from '../../store/actions/lobby/ClearLobbyErrorAction';

const mapStateToProps = (state) => {
  return {
    error: state.lobby.error,
    lobby: state.lobby.current,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    redirect: (uri) => dispatch(GoToLocation(uri)),
    clearError: () => dispatch(ClearLobbyError()),
    createLobby,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LobbyCreatePage);
