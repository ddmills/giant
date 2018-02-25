import {h} from 'preact';
import {route} from 'preact-router';

export default (props) => {
  return (
    <div>
      <h1>Sign in</h1>
      <a href="auth/sign-in">Sign in with Steam</a>
    </div>
  );
}
