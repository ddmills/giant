import {h} from 'preact';
import ConnectionStatus from '../../../components/connection-status/ConnectionStatus';
import Avatar from '../../../components/avatar/Avatar';
import './page-header.scss';
import SteamIcon from '../../../components/icons/SteamIcon';
import SuperHeader from '../super-header/SuperHeaderContainer';
import {Link} from 'react-router-dom';

function renderUser(user) {
  if (user) {
    return (
      <Avatar user={user}/>
    );
  } else {
    return (
      <Link to="/sign-in" class="btn btn--primary">
        Sign in with Steam
        <SteamIcon/>
      </Link>
    )
  }
}

export default ({user}) => {
  return (
    <div>
      <SuperHeader/>
      <header class="page-header">
        <div class="container">
          <span class="pull-right">
            {renderUser(user)}
          </span>
          <Link to="/">
            <h2 class="page-header-title">
              Giant
            </h2>
          </Link>
        </div>
      </header>
    </div>
  );
}
