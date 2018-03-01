import {h} from 'preact';
import ConnectionStatus from '../../../components/connection-status/ConnectionStatus';
import Avatar from '../../../components/avatar/Avatar';
import './page-header.scss';
import SteamIcon from '../../../components/icons/SteamIcon';
import SuperHeader from '../super-header/SuperHeaderContainer';

function renderUser(user) {
  if (user) {
    return (
      <Avatar user={user}/>
    );
  } else {
    return (
      <a href="/auth/sign-in" class="btn btn--primary">
        Sign in with Steam
        <SteamIcon/>
      </a>
    )
  }
}

export default ({connected, latency, user}) => {
  return (
    <div>
      <SuperHeader/>
      <header class="page-header">
        <div class="container">
          <span class="pull-right">
            {renderUser(user)}
          </span>
          <h2 class="title">
            Giant
          </h2>
        </div>
      </header>
    </div>
  );
}
