import {h} from 'preact';
import {Link} from 'react-router-dom';
import './lobby-summary.scss';

export default ({lobby}) => {
  if (!lobby) {
    return null;
  }

  const lobbyUri = `/lobby/${lobby.id}`;

  return (
    <Link to={lobbyUri} class="lobby-summary btn btn--primary">
      Current lobby
    </Link>
  );
}
