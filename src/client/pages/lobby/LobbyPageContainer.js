import {connect} from 'preact-redux';
import LobbyPage from './LobbyPage';
import {loadLobby, joinLobby, leaveLobby} from '../../network/Api';
import GoToLocation from '../../store/actions/router/GoToLocationAction';

const mapStateToProps = (state, props) => {
  return {
    user: state.auth.user,
    error: state.lobby.error,
    lobby: state.lobby.current,
    lobbyId: props.match.params.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    redirect: (uri) => dispatch(GoToLocation(uri)),
    loadLobby,
    joinLobby,
    leaveLobby,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LobbyPage);
