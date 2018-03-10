import Model from './Model';

export default class Exception extends Model {
  static get defaults() {
    return {
      id: null,
      message: 'An error occurred',
      status: 500,
    }
  }
}
