import {h} from 'preact';
import {Link} from 'preact-router/match';
import Counter from '../../components/Counter';
import Subheader from '../../components/subheader/Subheader';
import {
  INCREMENT,
  DECREMENT
} from '../../store/actions/ActionTypes';
import BasicPage from '../layout/BasicPage';

function renderAuthenticationLinks(authenticated) {
  if (authenticated) {
    return [
      <li>
        <Link href="/sign-out">
          Sign out
        </Link>
      </li>,
      <li>
        <Link href="/create-game">
          Create game
        </Link>
      </li>,
    ];
  }

  return (
    <li>
      <Link href="/sign-in">
        Sign in
      </Link>
    </li>
  );
}

export default ({authenticated, count, connected, latency, onIncrement, onDecrement}) => {
  return (
    <BasicPage>
      <Subheader description="This is a subheader component">Welcome to game {count}</Subheader>
      <ul>
        {renderAuthenticationLinks(authenticated)}
      </ul>
      <Counter
        count={count}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </BasicPage>
  );
};

