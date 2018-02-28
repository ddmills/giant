import {h} from 'preact';
import Router from 'preact-router';
import HomePage from './pages/home/HomePageContainer';
import SignInPage from './pages/sign-in/SignInPageContainer';
import SignOutPage from './pages/sign-out/SignOutPage';
import TokenPage from './pages/token/TokenPage';
import RequireAuthentication from './pages/require-authentication/RequireAuthenticationContainer';
import CreateGamePage from './pages/create-game/CreateGamePageContainer';

export default () => {
  return (
    <Router>
      <HomePage path="/"/>
      <SignInPage path="/sign-in"/>
      <SignOutPage path="/sign-out"/>
      <TokenPage path="/token/:token"/>
      <RequireAuthentication path="/create-game">
          <CreateGamePage/>
      </RequireAuthentication>
    </Router>
  );
};
