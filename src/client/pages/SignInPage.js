import {h} from 'preact';
import {route} from 'preact-router';
import {unsignedRequest} from '../network/Request';

function signIn() {
  unsignedRequest({
    url: '/auth/sign-in',
    method: 'post',
  }, (error, data) => {
    console.log(error, data);
    route('/');
  });
}

export default (props) => {
  return (
    <div>
      <h1>Sign in</h1>
      <button onClick={signIn}>Sign in</button>
    </div>
  );
}
