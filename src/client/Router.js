import {h} from 'preact';
import Router from 'preact-router';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';

export default (props) => {
  return (
    <Router>
      <HomePage path="/"/>
      <SignInPage path="/sign-in"/>
    </Router>
  );
}
