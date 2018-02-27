import {h} from 'preact';
import Router from 'preact-router';
import HomePageContainer from './pages/home/HomePageContainer';
import SignInPageContainer from './pages/sign-in/SignInPageContainer';
import TokenPage from './pages/token/TokenPage';

export default () => {
  return (
    <div>
      <Router>
        <HomePageContainer path="/"/>
        <SignInPageContainer path="/sign-in"/>
        <TokenPage path="/token/:token"/>
      </Router>
    </div>
  );
};
