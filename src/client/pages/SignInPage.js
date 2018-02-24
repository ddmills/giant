import {h} from 'preact';
import {route} from 'preact-router';

function signIn() {
  console.log('sign in!');
  route('/');
}

export default (props) => {
  return (
    <div>
      <h1>Sign in</h1>
      <button onClick={signIn}>Sign in</button>
    </div>
  );
}
