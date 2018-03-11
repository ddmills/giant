import Model from './Model';
import {uuid} from '../utilities/Random';

export default class Bot extends Model {
  static get defaults() {
    return {
      id: uuid(),
      name: 'Bot',
      displayName: 'bot',
      isBot: true,
    }
  }
}
