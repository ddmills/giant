import Model from './Model';

export default class Registry extends Model {
  static get defaults() {
    return {
      data: {}
    };
  }

  register(id, datum) {
    this.data[id] = datum;
  }

  contains(id) {
    return id in this.data;
  }

  get(id) {
    return this.data[id];
  }

  remove(id) {
    delete this.data[id];
  }

  getAll() {
    return Object.values(this.data);
  }
}
