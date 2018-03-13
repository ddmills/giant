import Model from './Model';
import {create as createHeroDeck} from './factories/HeroDeckFactory';
import {create as createBlueprintDeck} from './factories/BuildingDeckFactory';
import {create as createStarterDeck} from './factories/StarterDeckFactory';
import Registry from './Registry';
import Deck from './Deck';
import Player from './Player';

export default class Lobby extends Model {
  static get defaults() {
    return {
      id: null,
      ownerId: -1,
      name: '',
      description: '',
      turnDuration: 30,
      maxNumberOfPlayers: 3,
      isPublic: true,
      isDisbanded: false,
      isStarted: false,
      isFinished: false,
      context: null,
      players: [],
      cardRegistry: Registry.create(),
      heroDeck: Deck.create(),
      heroRow: Deck.create(),
      blueprintDeck: Deck.create(),
      blueprintRow: Deck.create(),
      cardRegistry: Registry.create(),
      currentTurn: 0,
      playerTurnOrder: [],
    }
  }

  get nonBotPlayers() {
    return this.players.filter((player) => !player.isBot);
  }

  get numberOfPlayers() {
    return this.players.length;
  }

  get isFull() {
    return this.players.length >= this.maxNumberOfPlayers;
  }

  get isEmpty() {
    return this.players.length <= 0;
  }

  addPlayer(newPlayer) {
    if (!this.isStarted && !this.isFull && !this.players.some((player) => player.id === newPlayer.id)) {
      this.players.push(newPlayer);
      if (!this.ownerId) {
        this.ownerId = newPlayer.id;
      }
      return true;
    }

    return false;
  }

  removePlayerById(playerId) {
    this.players = this.players.filter((player) => player.account.id !== playerId);
  }

  start() {
    this.isStarted = true;
    this.heroDeck = createHeroDeck();
    this.blueprintDeck = createBlueprintDeck();

    this.players.forEach((player) => {
      player.deck = createStarterDeck();
      player.deck.forEach((card) => this.cardRegistry.register(card.id, card));
    });

    this.heroDeck.forEach((card) => this.cardRegistry.register(card.id, card));
    this.blueprintDeck.forEach((card) => this.cardRegistry.register(card.id, card));
  }
}
