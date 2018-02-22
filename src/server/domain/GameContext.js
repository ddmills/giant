import Model from './Model';
import Deck from './Deck';
import Registry from './Registry';
import {shuffle} from '../utilities/Random';

export default class GameContext extends Model {
  static get defaults() {
    return {
      id: null,
      players: [],
      heroDeck: Deck.create(),
      heroRow: Deck.create(),
      blueprintDeck: Deck.create(),
      blueprintRow: Deck.create(),
      cardRegistry: Registry.create(),
      currentTurn: 0,
      playerTurnOrder: [],
    };
  }

  get currentPlayerId() {
    return this.playerTurnOrder[this.currentTurn % this.players.length];
  }

  get currentPlayer() {
    return this.getPlayer(this.currentPlayerId);
  }

  setup() {
    this.heroDeck.shuffle();
    this.blueprintDeck.shuffle()

    this.heroRow.drawFrom(this.heroDeck, 5);
    this.blueprintRow.drawFrom(this.blueprintDeck, 5);

    this.players.forEach((player) => player.deck.shuffle());
    this.players.forEach((player) => player.draw(5));

    this.playerTurnOrder = shuffle(this.players.map((player) => player.id));
  }

  isPlayersTurn(player) {
    return player.id === this.currentPlayerId;
  }

  getPlayer(playerId) {
    return this.players.find((player) => player.id === playerId);
  }

  endTurn() {
    this.currentPlayer.onEndTurn();
    this.blueprintRow.drawFrom(this.blueprintDeck, 5 - this.blueprintRow.count);
    this.heroRow.drawFrom(this.heroDeck, 5 - this.heroRow.count);
    this.currentTurn++;
  }

  getCard(id) {
    return this.cardRegistry.get(id);
  }
}
