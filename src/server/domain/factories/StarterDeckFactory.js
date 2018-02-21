import {getHero} from '../../repositories/CardRepository';
import starterDeckData from '../../../data/decks/starter-deck.json';
import {repeat} from '../../utility/Array';
import {uuid} from '../../utility/Random';
import Deck from '../../domain/Deck';

export function create() {
  const deck = Deck.create();

  starterDeckData.forEach((cardData) => {
    deck.add(...repeat(() => getHero(cardData.typeId), cardData.count));
  });

  return deck;
}
