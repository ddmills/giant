import {END_TURN, PURCHASE_BLUEPRINT, PURCHASE_HERO} from './CommandType';
import {create as createPurchaseBlueprintCommand} from './factories/PurchaseBlueprintCommandFactory';
import {create as createPurchaseHeroCommand} from './factories/PurchaseHeroCommandFactory';
import {create as createEndTurnCommand} from './factories/EndTurnCommandFactory';
import {get as getGameContext} from '../repositories/GameContextRepository';

const commandTypeMap = {
  [END_TURN]: createEndTurnCommand,
  [PURCHASE_BLUEPRINT]: createPurchaseBlueprintCommand,
  [PURCHASE_HERO]: createPurchaseHeroCommand,
}

export function create(gameContextId, playerId, commandType, parameters = {}, callback) {
  getGameContext(gameContextId, (error, gameContext) => {
    if (!gameContext) {
      callback(`Invalid game context id (${gameContextId})`);
      return;
    }

    const player = gameContext.getPlayer(playerId);
    const command = commandTypeMap[commandType](gameContext, player, parameters);

    if (!command) {
      callback(`Couldn't parse command`);
      return;
    }

    callback(undefined, command);
  });
};
