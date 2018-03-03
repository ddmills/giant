import {h} from 'preact';
import {Link} from 'react-router-dom';
import Subheader from '../../components/subheader/Subheader';
import BasicPage from '../layout/BasicPage';

function renderAuthenticationLinks(authenticated) {
  if (authenticated) {
    return [
      <li>
        <Link to="/sign-out">
          Sign out
        </Link>
      </li>,
      <li>
        <Link to="/create-game">
          Create game
        </Link>
      </li>,
    ];
  }

  return (
    <li>
      <Link to="sign-in">
        Sign in
      </Link>
    </li>
  );
}

export default ({authenticated}) => {
  return (
    <BasicPage>
      <Subheader description="This is a subheader component">Welcome to game</Subheader>
      <ul>
        {renderAuthenticationLinks(authenticated)}
      </ul>
    </BasicPage>
  );
};

