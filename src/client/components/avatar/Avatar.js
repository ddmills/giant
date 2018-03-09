import {h} from 'preact';
import './avatar.scss';

export default ({avatarUrl, displayName, className}) => {
  return (
      <img
        class={`avatar ${className ? className : ''}`}
        src={avatarUrl}
        alt={displayName}
        title={displayName}
      />
  );
}
