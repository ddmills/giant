import {connect} from 'preact-redux';
import LobbyIndexPage from './LobbyIndexPage';
import GoToLocation from '../../store/actions/router/GoToLocationAction';
import {getLobbies} from '../../network/Api';
import ClearLobbyCollection from '../../store/actions/lobby/ClearLobbyCollectionAction';

const mapStateToProps = (state) => {
  return {
    lobbies: state.lobby.collection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    redirect: (uri) => dispatch(GoToLocation(uri)),
    getLobbies: () => {
      dispatch(ClearLobbyCollection());
      getLobbies();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LobbyIndexPage);
