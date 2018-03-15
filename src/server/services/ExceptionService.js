import {uuid} from '../utilities/Random';
import {save as saveException} from '../repositories/ExceptionRepository';
import Exception from '../domain/Exception';
import {error} from '../utilities/Logger';

export function create(message, code = 500) {
  const exception = Exception.create({
    id: uuid(),
    message,
    code,
    fatal: false,
  });

  error(`${code} ${message}`);

  return exception;
}

export function createFatal(message, code = 500) {
  const exception = Exception.create({
    id: uuid(),
    message,
    code,
    fatal: true,
  });

  error(`${code} ${message} (FATAL)`);

  return exception;
}
