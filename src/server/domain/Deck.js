import Model from './Model';
import {shuffle} from '../utilities/Random';

export default class Deck extends Model {
  static get defaults() {
    return {
      cards: [],
    };
  }

  get count() {
    return this.cards.length;
  }

  peek(count = 1) {
    return this.cards.slice(0, count);
  }

  add(...cards) {
    this.cards.push(...cards);

    return this;
  }

  remove(card) {
    const index = this.cards.indexOf(card);

    if (index >= 0) {
      this.cards.splice(index, 1);
    }
  }

  includes(card) {
    return this.cards.includes(card);
  }

  forEach(callback) {
    return this.cards.forEach(callback);
  }

  map(callback) {
    return this.cards.map(callback);
  }

  reduce(callback, initialValue) {
    return this.cards.reduce(callback, initialValue);
  }

  filter(callback) {
    return this.cards.filter(callback);
  }

  findCard(id) {
    return this.cards.find((card) => card.id === id);
  }

  draw(count = 1) {
    return this.cards.splice(0, count);
  }

  drawFrom(other, count = 1) {
    const cards = other.draw(count);

    this.add(...cards);

    return cards;
  }

  drawAllFromDeck(other) {
    this.drawFrom(other, other.count);

    return this;
  }

  shuffle() {
    shuffle(this.cards);

    return this;
  }
}
