import {h} from 'preact';
import {Link} from 'preact-router/match';
import Counter from '../../components/Counter';
import {
  INCREMENT,
  DECREMENT
} from '../../store/actions/ActionTypes';
import BasicPage from '../layout/BasicPage';

export default ({count, connected, latency, onIncrement, onDecrement}) => {
  return (
    <BasicPage>
      <h1>Home {count}</h1>
      <Link href="/sign-in">
        Sign in
      </Link>
      <Counter
        count={count}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </BasicPage>
  );
};

