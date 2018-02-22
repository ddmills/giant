import Model from './Model';
import Deck from './Deck';

export default class Player extends Model {
  static get defaults() {
    return {
      id: -1,
      name: 'no name',
      spentValue: 0,
      hand: Deck.create(),
      discardDeck: Deck.create(),
      buildingDeck: Deck.create(),
    }
  }

  get totalValue() {
    const handValue = this.hand.reduce((total, card) => total + card.value, 0);
    const buildingValue = this.buildingDeck.reduce((total, card) => total + card.currentValue, 0);

    return handValue + buildingValue;
  }

  get currentValue() {
    return this.totalValue - this.spentValue;
  }

  draw(count = 1) {
    if (this.deck.count >= count) {
      this.hand.drawFrom(this.deck, count);
      return;
    }

    this.hand.drawAllFromDeck(this.deck);
    this.deck.drawAllFromDeck(this.discardDeck).shuffle();
    this.hand.drawFrom(this.deck, count - this.hand.count);
  }

  canPurchaseHero(card) {
    return card.cost <= this.currentValue;
  }

  canPurchaseBlueprint(card) {
    return card.cost <= this.currentValue;
  }

  purchaseHero(card) {
    this.spentValue += card.cost;
    this.discardDeck.add(card);
  }

  purchaseBlueprint(card) {
    this.spentValue += card.cost;
    card.disable();
    this.buildingDeck.add(card);
  }

  discardHand() {
    this.discardDeck.drawAllFromDeck(this.hand);
  }

  onEndTurn() {
    this.discardHand();
    this.spentValue = 0;
    this.buildingDeck.forEach((card) => card.enable());
    this.draw(5);
  }
}
