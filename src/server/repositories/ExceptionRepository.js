import {uuid} from '../utilities/Random';

const exceptions = {};

export function save(exception, callback) {
  if (!exception.id) {
    exception.id = uuid();
  }

  exceptions[exception.id] = exception;

  callback(undefined, exception);
}

export function remove(exceptionId, callback) {
  delete exceptions[exceptionId];

  callback(undefined);
}

export function get(exceptionId, callback) {
  callback(undefined, exceptions[exceptionId]);
}

export function getAll(callback) {
  callback(undefined, Object.values(exceptions));
}
