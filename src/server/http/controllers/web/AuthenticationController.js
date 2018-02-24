import {log, json} from '../../../utilities/Logger';

export function login(request, response) {
  log('sign in', request.sessionID);

  request.session.authenticated = true;
  response.redirect('back');
}

export function logout(request, response) {
  log('sign out', request.sessionID);

  if (request.session.authenticated) {
    request.session.authenticated = false;
  }

   response.redirect('back');
}
