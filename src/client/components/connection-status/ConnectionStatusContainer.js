import {connect} from 'preact-redux';
import ConnectionStatus from './ConnectionStatus';

const mapStateToProps = (state) => {
  return {
    connected: state.connected,
    latency: state.latency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionStatus);
