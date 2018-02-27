import {connect} from 'preact-redux';
import SuperHeader from './SuperHeader';

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

export default connect(mapStateToProps, mapDispatchToProps)(SuperHeader);
