import {connect} from 'preact-redux';
import LobbyCreatePage from './LobbyCreatePage';
import GoToLocation from '../../store/actions/router/GoToLocationAction';
import {createLobby} from '../../network/Api';

const mapStateToProps = (state) => {
  return {
    lobby: state.lobby.current,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    redirect: (uri) => dispatch(GoToLocation(uri)),
    createLobby,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LobbyCreatePage);
