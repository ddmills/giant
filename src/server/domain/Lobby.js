import Model from './Model';

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
      players: [],
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
    this.players = this.players.filter((player) => player.id !== playerId);
  }

  start() {
    this.isStarted = true;
  }
}
