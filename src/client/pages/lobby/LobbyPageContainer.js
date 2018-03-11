import {connect} from 'preact-redux';
import LobbyPage from './LobbyPage';
import {loadLobby, joinLobby, leaveLobby, addBot} from '../../network/Api';
import GoToLocation from '../../store/actions/router/GoToLocationAction';

const mapStateToProps = (state, props) => {
  const lobby = state.lobby.current;
  const user = state.auth.user;

  return {
    user,
    error: state.lobby.error,
    isOwner: lobby && lobby.ownerId === user.id,
    lobby,
    lobbyId: props.match.params.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    redirect: (uri) => dispatch(GoToLocation(uri)),
    loadLobby,
    joinLobby,
    leaveLobby,
    addBot,
    startGame: () => console.log('start game...'),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LobbyPage);
