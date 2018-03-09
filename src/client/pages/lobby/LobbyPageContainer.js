import {connect} from 'preact-redux';
import LobbyPage from './LobbyPage';
import {getLobby} from '../../network/Api';
import FetchLobby from '../../store/actions/lobby/FetchLobbyAction';
import JoinLobby from '../../store/actions/lobby/JoinLobbyAction';
import LeaveLobby from '../../store/actions/lobby/LeaveLobbyAction';
import GoToLocation from '../../store/actions/router/GoToLocationAction';

const mapStateToProps = (state, props) => {
  const isLobbyLoaded = state.lobby.id && state.lobby.id === props.match.params.id;
  const isCurrentUserPlayer = isLobbyLoaded && state.lobby.players.some((player) => player.id === state.auth.user.id);
  const isLobbyFull = isLobbyLoaded && state.lobby.players.length >= state.lobby.maxNumberOfPlayers;
  const isLobbyOwner = isLobbyLoaded && state.lobby.ownerId === state.auth.user.id;
  const owner = isLobbyLoaded && state.lobby.players.find((player) => player.id === state.lobby.ownerId);

  return {
    user: state.auth.user,
    lobbyId: props.match.params.id,
    lobby: state.lobby,
    owner,
    isLobbyOwner,
    isCurrentUserPlayer,
    isLobbyFull,
    isLobbyLoaded,
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
