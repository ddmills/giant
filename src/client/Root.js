import {h} from 'preact';
import {Provider} from 'preact-redux';
import {store} from './store/Store';
import App from './App';
import {Router , Route} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {history} from './store/History';

import HomePage from './pages/home/HomePageContainer';
import SignInPage from './pages/sign-in/SignInPageContainer';
import SignOutPage from './pages/sign-out/SignOutPage';
import TokenPage from './pages/token/TokenPageContainer';
import RequireAuthentication from './pages/require-authentication/RequireAuthenticationContainer';
import CreateGamePage from './pages/create-game/CreateGamePageContainer';
import LobbyPage from './pages/lobby/LobbyPageContainer';

export default (props) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact={true} path="/" component={HomePage}/>
          <Route path="/sign-in" component={SignInPage}/>
          <Route path="/sign-out" component={SignOutPage}/>
          <Route path="/token/:token" component={TokenPage}/>
          <Route path="/create-game" component={CreateGamePage}/>
          <Route path="/lobby/:id" component={LobbyPage}/>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}
