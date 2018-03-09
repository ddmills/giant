import {h} from 'preact';
import './player-list.scss';
import Avatar from '../../components/avatar/Avatar';
import BotImage from '../../images/bot-avatar.png';

function renderLeaveButton(isOwner, isUser, onLeave) {
  if (isUser) {
    return (
      <button class="btn btn--danger pull-right" onClick={onLeave}>
        Leave
      </button>
    );
  }
}

function renderPlayer(player, userId, ownerId, onLeave) {
  const isOwner = player.id === ownerId;
  const isUser = player.id === userId;

  return (
    <li class="player-list-item">
      <Avatar avatarUrl={player.avatar} displayName={player.displayName}/>
      <span class="player-list-item-name">
        {player.displayName} {isOwner ? ' *' : ''}
      </span>
      {renderLeaveButton(isOwner, isUser, onLeave)}
    </li>
  );
}

function renderPlayers(players, userId, ownerId, onLeave) {
  return players.map((player) => {
    return renderPlayer(player, userId, ownerId, onLeave);
  });
}

function renderAddBot(userId, ownerId) {
  if (ownerId === userId) {
    return (
      <li class="player-list-item">
        <Avatar avatarUrl={BotImage} displayName="Bot boy"/>
        <button class="btn btn--info">
          Add Bot
        </button>
      </li>
    );
  }
}

export default ({ownerId, userId, players, onLeave}) => {
  return (
    <ul class="player-list">
      {renderPlayers(players, userId, ownerId, onLeave)}
      {renderAddBot(userId, ownerId)}
    </ul>
  );
}
