import {h} from 'preact';
import {connect} from 'preact-redux';
import {Link} from 'preact-router/match';
import Counter from '../components/CounterComponent';
import ConnectionStatus from '../components/ConnectionStatusComponent';
import {
  INCREMENT,
  DECREMENT
} from '../store/actions/ActionTypes';

const mapStateToProps = (state) => {
  return {
    count: state.count,
    connected: state.connected,
    latency: state.latency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => dispatch({ type: INCREMENT }),
    onDecrement: () => dispatch({ type: DECREMENT }),
  };
};

const HomePage = ({count, connected, latency, onIncrement, onDecrement}) => {
  return (
    <div>
      <h1>Home {count}</h1>
      <Link href="/sign-in">
        Sign in
      </Link>
      <Counter
        count={count}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
      <ConnectionStatus
        connected={connected}
        latency={latency}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
