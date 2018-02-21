import {create as createStarterDeck} from './StarterDeckFactory';
import Player from '../Player';
import Deck from '../Deck';

export function create(id, cardRegistry) {
  const starterDeck = createStarterDeck();

  starterDeck.forEach((card) => cardRegistry.register(card.id, card));

  return Player.create({
    id,
    deck: starterDeck,
  });
};
