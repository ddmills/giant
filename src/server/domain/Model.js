export default class Model {
  constructor(properties = {}) {
    Object.assign(this, properties);
  }

  static get defaults() {
    return {};
  }

  static create(overrides = {}) {
    return new this({
      ...this.defaults,
      ...overrides
    });
  }
}
