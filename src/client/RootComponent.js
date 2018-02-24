import {h, Component} from 'preact';
import {greet} from './network/Client';
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
