import {h} from 'preact';
import {Link} from 'react-router-dom';
import Subheader from '../../components/subheader/Subheader';
import BasicLayout from '../layout/BasicLayout';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';

function renderAuthenticationLinks(authenticated) {
  if (authenticated) {
    return [
        <Link class="btn" to="/sign-out">
          Sign out
        </Link>,
        <Link class="btn btn--primary" to="/lobby/create">
          Create game
        </Link>,
        <Link class="btn btn--primary" to="/lobbies">
          Browse games
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
    <BasicLayout>
      <Subheader description="This is a subheader component">Welcome to Giant</Subheader>
      <div class="pull-right">
        {renderAuthenticationLinks(authenticated)}
      </div>
    </BasicLayout>
  );
};

