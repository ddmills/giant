import Command from './Command';

export default class PurchaseHeroCommand extends Command {
  constructor(context, player, card) {
    super();
    this.context = context;
    this.player = player;
    this.card = card;
  }

  static create(context, player, card) {
    return new PurchaseHeroCommand(context, player, card);
  }

  authorize() {
    if (this.context.isPlayersTurn(this.player)) {
      return this.context.heroRow.includes(this.card) && this.player.canPurchaseHero(this.card);
    }

    return false;
  }

  perform() {
    this.context.heroRow.remove(this.card);

    this.player.purchaseHero(this.card);
  }
}
