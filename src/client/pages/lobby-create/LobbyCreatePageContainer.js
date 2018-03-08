import {connect} from 'preact-redux';
import LobbyCreatePage from './LobbyCreatePage';
import LobbyCreated from '../../store/actions/lobby/LobbyCreatedAction';
import GoToLocation from '../../store/actions/router/GoToLocationAction';
import {createLobby} from '../../network/Api';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    lobby: state.lobby,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLobbyCreated: (lobby) => {
      dispatch(LobbyCreated(lobby));
      dispatch(GoToLocation(`/lobby/${lobby.id}`));
    },
    createLobby,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LobbyCreatePage);
