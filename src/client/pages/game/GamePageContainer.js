import {connect} from 'preact-redux';
import GamePage from './GamePage';
import {loadGame} from '../../network/Api';

const mapStateToProps = (state, props) => {
  const gameId = props.match.params.id;
  const user = state.auth.user;

  return {
    user,
    gameId,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const gameId = props.match.params.id;

  return {
    loadGame,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
