import PurchaseHeroCommand from '../PurchaseHeroCommand';

export function create(gameContext, player, parameters) {
  const card = gameContext.getCard(parameters.cardId);

  return PurchaseHeroCommand.create(gameContext, player, card);
}
