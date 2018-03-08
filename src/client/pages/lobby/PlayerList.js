import {h} from 'preact';
import './player-list.scss';
import Avatar from '../../components/avatar/Avatar';

function renderPlayer(player, userId, ownerId) {
  const isOwner = player.id === ownerId;
  const isUser = player.id === userId;

  const leaveButton = (
    <button class="btn btn--danger pull-right">
      Leave
    </button>
  );

  const kickButton = (
    <button class="btn btn--danger pull-right">
      Kick
    </button>
  );

  return (
    <li class="player-list-item">
      <Avatar user={player}/>
      <span class="player-list-item-name">
        {player.displayName}
      </span>
      {isOwner && isUser ? leaveButton : ''}
      {isOwner && !isUser ? kickButton : ''}
    </li>
  );
}

function renderPlayers(players, userId, ownerId) {
  return players.map((player) => {
    return renderPlayer(player, userId, ownerId);
  });
}

export default ({ownerId, userId, players}) => {
  return (
    <ul class="player-list">
      {renderPlayers(players, userId, ownerId)}
    </ul>
  );
}
