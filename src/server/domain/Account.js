import Model from './Model';

export class Account extends Model {
  static get defaults() {
    return {
      steamId: '-1',
      name: 'tester',
    }
  }
}
