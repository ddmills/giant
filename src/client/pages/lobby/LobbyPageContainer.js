import {connect} from 'preact-redux';
import LobbyPage from './LobbyPage';
import {getLobby} from '../../network/Api';
import FetchLobby from '../../store/actions/lobby/FetchLobbyAction';
import JoinLobby from '../../store/actions/lobby/JoinLobbyAction';
import LeaveLobby from '../../store/actions/lobby/LeaveLobbyAction';
import GoToLocation from '../../store/actions/router/GoToLocationAction';

const mapStateToProps = (state, props) => {
  const lobby = state.lobby.current;

  const isLobbyLoaded = lobby && lobby.id === props.match.params.id;
  const isCurrentUserPlayer = isLobbyLoaded && lobby.players.some((player) => player.id === state.auth.user.id);
  const isLobbyFull = isLobbyLoaded && lobby.players.length >= lobby.maxNumberOfPlayers;
  const isLobbyOwner = isLobbyLoaded && lobby.ownerId === state.auth.user.id;
  const owner = isLobbyLoaded && lobby.players.find((player) => player.id === lobby.ownerId);
  const error = state.lobby.error;

  return {
    user: state.auth.user,
    lobbyId: props.match.params.id,
    lobby,
    owner,
    isLobbyOwner,
    isCurrentUserPlayer,
    isLobbyFull,
    isLobbyLoaded,
    error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => console.log('start game'),
    getLobby: (lobbyId) => dispatch(FetchLobby(lobbyId)),
    joinLobby: (lobbyId) => dispatch(JoinLobby(lobbyId)),
    leaveLobby: (lobbyId) => {
      dispatch(LeaveLobby(lobbyId));
      dispatch(GoToLocation('/'));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LobbyPage);
