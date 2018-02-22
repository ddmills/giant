import Command from './Command';

export default class PurchaseBlueprintCommand extends Command {
  constructor(context, player, card) {
    super();
    this.context = context;
    this.player = player;
    this.card = card;
  }

  static create(context, player, card) {
    return new PurchaseBlueprintCommand(context, player, card);
  }

  authorize() {
    if (this.context.isPlayersTurn(this.player)) {
      return this.context.blueprintRow.includes(this.card) && this.player.canPurchaseBlueprint(this.card);
    }

    return false;
  }

  perform() {
    this.context.blueprintRow.remove(this.card);

    this.player.purchaseBlueprint(this.card);
  }
}
