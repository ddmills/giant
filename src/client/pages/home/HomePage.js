import {h} from 'preact';
import {Link} from 'react-router-dom';
import Subheader from '../../components/subheader/Subheader';
import BasicPage from '../layout/BasicPage';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';

function renderAuthenticationLinks(authenticated) {
  if (authenticated) {
    return [
        <Link class="btn" to="/sign-out">
          Sign out
        </Link>,
        <Link class="btn btn--primary" to="/create-game">
          Create game
        </Link>
    ];
  }

  return (
    <Link class="btn" to="sign-in">
      Sign in
    </Link>
  );
}

export default ({authenticated}) => {
  return (
    <BasicPage>
      <Subheader description="This is a subheader component">Welcome to game</Subheader>
      <div class="pull-right">
        {renderAuthenticationLinks(authenticated)}
      </div>
    </BasicPage>
  );
};

