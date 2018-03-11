import {connect} from 'preact-redux';
import LobbyPage from './LobbyPage';
import {loadLobby, joinLobby, leaveLobby, addBot} from '../../network/Api';
import GoToLocation from '../../store/actions/router/GoToLocationAction';
import ClearLobbyError from '../../store/actions/lobby/ClearLobbyErrorAction';

const mapStateToProps = (state, props) => {
  const lobbyId = props.match.params.id;
  const lobby = state.lobby.current;
  const user = state.auth.user;

  return {
    user,
    error: state.lobby.error,
    isOwner: lobby && lobby.ownerId === user.id,
    lobby,
    lobbyId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    redirect: (uri) => dispatch(GoToLocation(uri)),
    clearError: () => dispatch(ClearLobbyError()),
    loadLobby,
    joinLobby,
    leaveLobby,
    addBot,
    startGame: () => console.log('start game...'),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LobbyPage);
