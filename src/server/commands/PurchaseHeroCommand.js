import Command from './Command';

export default class PurchaseHeroCommand extends Command {
  constructor(lobby, player, card) {
    super();
    this.lobby = lobby;
    this.player = player;
    this.card = card;
  }

  static create(lobby, player, card) {
    return new PurchaseHeroCommand(lobby, player, card);
  }

  authorize() {
    console.log(!!this.player, !!this.lobby, !!this.card);
    console.log('isPlayersTurn', this.lobby.isPlayersTurn(this.player.id));
    console.log('heroRow', this.lobby.heroRow.includes(this.card));
    console.log('canPurchaseHero', this.player.canPurchaseHero(this.card));

    return this.card
      && this.player
      && this.lobby
      && this.lobby.isPlayersTurn(this.player.id)
      && this.lobby.heroRow.includes(this.card)
      && this.player.canPurchaseHero(this.card);
  }

  perform() {
    this.lobby.heroRow.remove(this.card);

    this.player.purchaseHero(this.card);
  }
}
