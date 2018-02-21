import {create as createBuildingCard} from './BuildingCardFactory';
import {integer} from '../../utility/Random';
import {repeat} from '../../utility/Array';
import Deck from '../Deck';

export function create(overrides = {}) {
  return Deck.create({
    cards: repeat(createBuildingCard, integer(12, 24)),
    ...overrides,
  });
}
