import PurchaseBlueprintCommand from '../PurchaseBlueprintCommand';

export function create(gameContext, player, parameters) {
  const card = gameContext.getCard(parameters.cardId);

  return PurchaseBlueprintCommand.create(gameContext, player, card);
}
