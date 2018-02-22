import Command from './Command';

export default class EndTurnCommand extends Command {
  constructor(context, player) {
    super();
    this.context = context;
    this.player = player;
  }

  static create(context, player) {
    return new EndTurnCommand(context, player);
  }

  authorize() {
    return this.context.isPlayersTurn(this.player);
  }

  execute() {
    this.context.endTurn();
  }
}
