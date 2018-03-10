import {uuid} from '../utilities/Random';
import {save as saveException} from '../repositories/ExceptionRepository';
import Exception from '../domain/Exception';
import {error} from '../utilities/Logger';

export function create(message, status = 500) {
  const exception = Exception.create({
    id: uuid(),
    message,
    status,
  });

  error(exception);

  return exception;
}
