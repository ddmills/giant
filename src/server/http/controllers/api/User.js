export function create(request, response) {
  response.send({'hello': 'world'});
}

export function get(request, response) {
  response.send({'hello': 'world'});
}

export function getAll(request, response) {
  response.send([{'hello': 'world'}]);
}

