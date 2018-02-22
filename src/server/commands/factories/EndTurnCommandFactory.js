import EndTurnCommand from '../EndTurnCommand';

export function create(gameContext, player) {
  return EndTurnCommand.create(gameContext, player);
}
