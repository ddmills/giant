import {h} from 'preact';
import './avatar.scss';

export default ({user}) => {
  return (
      <img
        class="avatar"
        src={user.avatar}
        alt={user.displayName}
        title={user.displayName}
      />
  );
}
