export function serializeForEverone(lobby) {
  const data = {
    id: lobby.id,
    name: lobby.name,
    description: lobby.description,
    turnDuration: lobby.turnDuration,
    ownerId: lobby.ownerId,
    maxNumberOfPlayers: lobby.maxNumberOfPlayers,
    countDownTime: lobby.countDownTime,
    isPublic: lobby.isPublic,
    isDisbanded: lobby.isDisbanded,
    isStarted: lobby.isStarted,
    isFinished: lobby.isFinished,
    startTime: lobby.startTime,
    heroRow: lobby.heroRow,
    blueprintRow: lobby.blueprintRow,
    playerTurnOrder: lobby.playerTurnOrder,
    elapsedTime: lobby.elapsedTime,
    currentPlayerId: lobby.currentPlayerId,
  };

  data.players = lobby.players.map((player) => {
    return {
      id: player.id,
      account: player.account,
    };
  });

  return data;
}

export function serializeForUser(userId, lobby) {
  if (!lobby) {
    return lobby;
  }

  const data = serializeForEverone(lobby);

  data.players = lobby.players.map((player) => {
    const base = {
      id: player.id,
      account: player.account,
      buildingDeck: player.buildingDeck,
    }

    if (player.account.id === userId) {
      base.hand = player.hand;
      base.totalValue = player.totalValue;
      base.spentValue = player.spentValue;
      base.currentValue = player.currentValue;
    }

    return base;
  });

  return data;
}
