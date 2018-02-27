import {h} from 'preact';
import {route} from 'preact-router';
import BasicPage from '../layout/BasicPage';

export default (props) => {
  return (
    <BasicPage>
      <h1>Sign in</h1>
      <a href="auth/sign-in">Sign in with Steam</a>
    </BasicPage>
  );
}
