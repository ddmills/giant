import Model from './Model';

export default class Card extends Model {
  static get defaults() {
    return {
      id: -1,
      name: 'no name',
      cost: 0,
      value: 0,
      attack: 0,
      defense: 0,
      enabled: false,
      description: 'no description',
    }
  }

  enable() {
    this.enabled = true;
  }

  disabled() {
    this.enabled = false;
  }
}
