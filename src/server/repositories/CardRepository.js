import heroData from '../../data/cards/hero-cards.json';
import buildingData from '../../data/cards/building-cards.json';
import Card from '../domain/Card';
import {uuid} from '../utility/Random';

export function getHero(typeId) {
  const data = heroData.find((data) => data.typeId === typeId);

  return data ? Card.create({
    ...data,
    id: uuid()
  }) : undefined;
}

export function getBuilding(typeId) {
  const data = buildingData.find((data) => data.typeId === typeId);

  return data ? Card.create({
    ...data,
    id: uuid()
  }) : undefined;
}
