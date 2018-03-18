import Command from './Command';

export default class PurchaseBlueprintCommand extends Command {
  constructor(lobby, player, card) {
    super();
    this.lobby = lobby;
    this.player = player;
    this.card = card;
  }

  static create(lobby, player, card) {
    return new PurchaseBlueprintCommand(lobby, player, card);
  }

  authorize() {
    return this.card
      && this.player
      && this.lobby
      && this.lobby.isPlayersTurn(this.player.id)
      && this.lobby.blueprintRow.includes(this.card)
      && this.player.canPurchaseBlueprint(this.card);
  }

  perform() {
    this.lobby.blueprintRow.remove(this.card);

    this.player.purchaseBlueprint(this.card);
  }
}
