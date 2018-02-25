import {h} from 'preact';
import {connect} from 'preact-redux';
import {Link} from 'preact-router/match';
import Counter from '../components/CounterComponent';
import {
  INCREMENT,
  DECREMENT
} from '../store/actions/ActionTypes';

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => dispatch({ type: INCREMENT }),
    onDecrement: () => dispatch({ type: DECREMENT }),
  };
};

const HomePage = ({count, onIncrement, onDecrement}) => {
  return (
    <div>
      <h1>Home {count}</h1>
      <Link href="/sign-in">Sign in</Link>
      <Counter
        count={count}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
