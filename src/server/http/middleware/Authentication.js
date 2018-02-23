export function requireAuthentication(request, response, next) {
  if (request.session.authenticated) {
    next();
  } else {
    response.status(401).json();
  }
}
