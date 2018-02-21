import {die, pick, uuid} from '../../utility/Random';
import Card from '../Card';

const names = [
  'gold mine',
  'palace',
  'statue',
  'barracks',
  'bath house',
  'temple',
  'stables',
  'clay pit',
  'butcher shop',
  'blacksmith',
  'market',
  'trading post',
  'dirt roads',
  'cottage',
  'well',
  'tavern',
  'chaple',
  'inn',
  'monestary',
  'apothicary',
  'hovel',
  'watchtower',
  'nunnery',
];

export function create(overrides = {}) {
  return Card.create({
    id: uuid(),
    instanceId: uuid(),
    name: pick(names),
    cost: die(),
    value: die(),
    description: pick(['hello world, this is description', 'lorem ipsum']),
    defense: die(),
    disabled: true,
    ...overrides,
  });
}
