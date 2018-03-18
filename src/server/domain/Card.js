import Model from './Model';

export default class Card extends Model {
  static get defaults() {
    return {
      id: -1,
      name: 'no name',
      typeId: 'no-type',
      cost: 0,
      value: 0,
      attack: 0,
      defense: 0,
      isEnabled: true,
      description: 'no description',
    }
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  get currentValue() {
    return this.isEnabled ? this.value : 0;
  }
}
