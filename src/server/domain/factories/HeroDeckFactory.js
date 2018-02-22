import {integer} from '../../utilities/Random';
import {repeat} from '../../utilities/Array';
import Deck from '../Deck';
import {create as createHeroCard} from './HeroCardFactory';

export function create(overrides = {}) {
  return Deck.create({
    cards: repeat(createHeroCard, integer(12, 24)),
    ...overrides,
  });
}
