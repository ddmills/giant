import {connect} from 'preact-redux';
import LobbyPage from './LobbyPage';
import {getLobby} from '../../network/Api';
import FetchLobby from '../../store/actions/lobby/FetchLobbyAction';

const mapStateToProps = (state, props) => {
  return {
    user: state.auth.user,
    id: props.match.params.id,
    lobby: state.lobby,
    isLobbyLoaded: state.lobby && state.lobby.id === props.match.params.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => console.log('start game'),
    getLobby: (id) => dispatch(FetchLobby(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LobbyPage);
