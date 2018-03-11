import {uuid} from '../utilities/Random';
import {save as saveException} from '../repositories/ExceptionRepository';
import Exception from '../domain/Exception';
import {error} from '../utilities/Logger';

export function create(message, code = 500, fatal = true) {
  const exception = Exception.create({
    id: uuid(),
    message,
    code,
    fatal,
  });

  error(exception);

  return exception;
}
