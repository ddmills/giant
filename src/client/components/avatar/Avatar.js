import {h} from 'preact';
import './avatar.scss';

export default ({user, className}) => {
  return (
      <img
        class={`avatar ${className}`}
        src={user.avatar}
        alt={user.displayName}
        title={user.displayName}
      />
  );
}
