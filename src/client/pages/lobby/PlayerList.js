import {h} from 'preact';
import './player-list.scss';
import Avatar from '../../components/avatar/Avatar';

function renderKickButton(id, isOwner, isUser, onKick) {
  if (isOwner && !isUser) {
    return (
      <button class="btn btn--danger pull-right" onClick={() => onKick(id)}>
        Kick
      </button>
    );
  }
}

function renderLeaveButton(isOwner, isUser, onLeave) {
  if (isOwner && isUser) {
    return (
      <button class="btn btn--danger pull-right" onClick={() => onLeave()}>
        Leave
      </button>
    );
  }
}

function renderPlayer(player, userId, ownerId, onKick, onLeave) {
  const isOwner = player.id === ownerId;
  const isUser = player.id === userId;

  return (
    <li class="player-list-item">
      <Avatar user={player}/>
      <span class="player-list-item-name">
        {player.displayName}
      </span>
      {renderLeaveButton(isOwner, isUser, onLeave)}
      {renderKickButton(player.id, isOwner, isUser, onKick)}
    </li>
  );
}

function renderPlayers(players, userId, ownerId, onKick, onLeave) {
  return players.map((player) => {
    return renderPlayer(player, userId, ownerId, onKick, onLeave);
  });
}

function renderAddBot(userId, ownerId) {
  if (ownerId === userId) {
    return (
      <li class="player-list-item">
        <button class="btn btn--info pull-right">
          Add Bot
        </button>
      </li>
    );
  }
}

export default ({ownerId, userId, players, onKick, onLeave}) => {
  return (
    <ul class="player-list">
      {renderPlayers(players, userId, ownerId, onKick, onLeave)}
      {renderAddBot(userId, ownerId)}
    </ul>
  );
}
