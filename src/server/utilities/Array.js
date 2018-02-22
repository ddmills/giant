export function repeat(fn, times) {
  return Array.from(Array(times)).map(fn);
}

export function reverseForEach(array, fn) {
  if (array.length <= 0) {
    return array;
  }

  for (let i = array.length - 1; i >= 0; i--) {
    fn(array[i], i);
  }

  return array;
}

export function reverseMap(array, fn) {
  const mapped = [];

  for (let i = array.length; i >= 0; i--) {
    mapped.push(fn(array[i]));
  }

  return mapped;
}

export function remove(array, element) {
  const index = array.indexOf(element);

  if (index >= 0) {
    array.splice(index, 1);
  }

  return array;
}
