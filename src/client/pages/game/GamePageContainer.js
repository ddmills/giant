import {connect} from 'preact-redux';
import GamePage from './GamePage';
import {getLobby, leaveLobby, endTurn} from '../../network/Api';

const mapStateToProps = (state, props) => {
  const lobbyId = props.match.params.id;
  const lobby = state.lobby.current;
  const user = state.auth.user;
  const error =  state.lobby.error;

  return {
    user,
    player: lobby && lobby.players.find((player) => player.account === user.id),
    lobbyId,
    error: error && error.fatal ? undefined : error,
    fatalError: error && error.fatal ? error : undefined,
    lobby,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const lobbyId = props.match.params.id;

  return {
    getLobby: () => getLobby(lobbyId),
    endTurn,
    leaveLobby,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
