import {connect} from 'preact-redux';
import LobbySummary from './LobbySummary';

const mapStateToProps = (state) => {
  return {
    lobby: state.lobby.current,
  };
};

export default connect(mapStateToProps)(LobbySummary);
