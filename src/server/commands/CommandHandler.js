import {create as createCommand} from './CommandFactory';
import {info, warn} from '../utilities/Logger';

export function handle(gameContextId, playerId, request, callback) {
  createCommand(gameContextId, playerId, request.type, request.parameters, (error, command) => {
    if (command.authorize()) {
      command.execute();
      info(`[${request.type}] ok`);
      callback();
    } else {
      warn(`[${request.type}] unauthorized`);
      callback('unauthorized');
    }
  });
}
