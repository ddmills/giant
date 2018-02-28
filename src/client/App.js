import {h} from 'preact';
import Router from 'preact-router';
import HomePageContainer from './pages/home/HomePageContainer';
import SignInPageContainer from './pages/sign-in/SignInPageContainer';
import TokenPage from './pages/token/TokenPage';
import RequireAuthentication from './pages/require-authentication/RequireAuthenticationContainer';
import CreateGamePage from './pages/create-game/CreateGamePageContainer';

export default () => {
  return (
    <Router>
      <HomePageContainer path="/"/>
      <SignInPageContainer path="/sign-in"/>
      <TokenPage path="/token/:token"/>
      <RequireAuthentication path="/create-game">
          <CreateGamePage/>
      </RequireAuthentication>
    </Router>
  );
};
