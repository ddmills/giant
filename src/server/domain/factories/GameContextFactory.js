import {create as createPlayer} from './PlayerFactory';
import {create as createHeroDeck} from './HeroDeckFactory';
import {create as createBlueprintDeck} from './BuildingDeckFactory';
import GameContext from '../GameContext';
import Deck from '../Deck';
import Registry from '../Registry';

export function create(...playerIds) {
  const cardRegistry = Registry.create();

  const heroDeck = createHeroDeck();
  const blueprintDeck = createBlueprintDeck();

  heroDeck.forEach((card) => cardRegistry.register(card.id, card));
  blueprintDeck.forEach((card) => cardRegistry.register(card.id, card));

  return GameContext.create({
    players: playerIds.map((id) => createPlayer(id, cardRegistry)),
    heroDeck,
    blueprintDeck,
    cardRegistry,
  });
}
