import {integer} from '../../utility/Random';
import {repeat} from '../../utility/Array';
import Deck from '../Deck';
import {create as createHeroCard} from './HeroCardFactory';

export function create(overrides = {}) {
  return Deck.create({
    cards: repeat(createHeroCard, integer(12, 24)),
    ...overrides,
  });
}
