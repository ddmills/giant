import {create as createCommand} from './CommandFactory';
import {info, warn} from '../utilities/Logger';

export function handle(gameContextId, playerId, request) {
  const command = createCommand(gameContextId, playerId, request.type, request.parameters);

  if (command.authorize()) {
    command.execute();
    info(`[${request.type}] ok`);
  } else {
    warn(`[${request.type}] unauthorized`);
  }
}
