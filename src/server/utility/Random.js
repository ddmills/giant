import RandomJS from 'random-js';

generator = new RandomJS;

export function integer(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
  return generator.integer(min, max);
}

export function positiveInteger(max = Number.MAX_SAFE_INTEGER) {
  return generator.integer(1, max);
}

export function negativeInteger(min = Number.MIN_SAFE_INTEGER) {
  return generator.integer(min, -1);
}

export function shuffle(array) {
  return generator.shuffle(array);
}

export function pick(array) {
  return generator.pick(array);
}

export function sample(array, count) {
  return generator.sample(array, count);
}

export function uuid() {
  return generator.uuid4();
}

export function bool(percentage) {
  return generator.bool(percentage);
}

export function float(min = Number.MIN_VALUE, max = Number.MAX_VALUE) {
  return generator.real(min, max);
}

export function die(sides = 6) {
  return generator.die(sides);
}
