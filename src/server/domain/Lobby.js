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
      isPublic: false,
      players: [],
    }
  }

  addPlayer(newPlayer) {
    if (!this.isFull && !this.players.some((player) => player.id === newPlayer.id)) {
      this.players.push(newPlayer);
      return true;
    }

    return false;
  }

  removePlayerById(playerId) {
    this.players = this.players.filter((player) => player.id !== playerId);

    if (playerId === this.ownerId) {
      if (!this.isEmpty) {
        this.ownerId = this.players[0].id;
      }
    }
  }

  get isFull() {
    return this.players.length >= this.maxNumberOfPlayers;
  }

  get isEmpty() {
    return this.players.length <= 0;
  }
}
