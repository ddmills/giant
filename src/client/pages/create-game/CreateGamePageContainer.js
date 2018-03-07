import {connect} from 'preact-redux';
import CreateGamePage from './CreateGamePage';
import GameCreated from '../../store/actions/game/GameCreatedAction';
import {push as Redirect} from 'react-router-redux';

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGameCreated: (game) => {
      dispatch(GameCreated(game));
      dispatch(Redirect(`/lobby/${game.id}`));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGamePage);
