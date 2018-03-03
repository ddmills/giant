import {connect} from 'preact-redux';
import ConnectionStatus from './ConnectionStatus';

const mapStateToProps = (state) => {
  return {
    connected: state.server.connected,
    latency: state.server.latency,
  };
};

export default connect(mapStateToProps)(ConnectionStatus);
