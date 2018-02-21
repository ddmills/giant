import {die, pick, uuid} from '../../utility/Random';
import Card from '../Card';

const names = ['malia', 'bob', 'jannet', 'robert', 'toby', 'clarice', 'stewart', 'diane', 'egbert', 'tommy', 'john', 'rebecca', 'simon', 'brent', 'matthew', 'mark', 'luke', 'billy', 'beatrice', 'kimmy', 'gilbert', 'hannibal', 'daniel', 'aubrey', 'alex', 'barnibus', 'eliza'];

export function create(overrides = {}) {
  return Card.create({
    id: uuid(),
    typeId: 'no-type',
    name: pick(names),
    cost: die(),
    value: die(),
    description: pick(['hello world', 'this is description', 'lorem ipsum']),
    attack: die(),
    ...overrides,
  });
}
