import Model from './Model';

export default class Account extends Model {
  static get defaults() {
    return {
      id: null,
      steamId: null,
      name: '',
      displayName: '',
      avatar: '',
      steamUrl: '',
    }
  }
}
