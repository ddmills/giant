import {h} from 'preact';
import {Provider} from 'preact-redux';
import {store} from './store/Store';
import {Router, Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {history} from './store/History';

import Unauthenticate from './store/actions/UnauthenticateAction';
import SignIn from './store/actions/SignInAction';
import {isExpired} from './utilities/Token';

import AuthenticatedRoute from './pages/authenticated-route/AuthenticatedRouteContainer';
import HomePage from './pages/home/HomePageContainer';
import SignInPage from './pages/sign-in/SignInPageContainer';
import SignOutPage from './pages/sign-out/SignOutPage';
import TokenPage from './pages/token/TokenPageContainer';
import LobbyPage from './pages/lobby/LobbyPageContainer';
import LobbyCreatePage from './pages/lobby-create/LobbyCreatePageContainer';
import LobbyIndexPage from './pages/lobby-index/LobbyIndexPageContainer';
import GamePage from './pages/game/GamePageContainer';

const token = localStorage.getItem('token');

if (token) {
  if (isExpired(token)) {
    store.dispatch(Unauthenticate());
  } else {
    store.dispatch(SignIn(token));
  }
}

export default (props) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact={true} path="/" component={HomePage}/>
          <Route path="/sign-in" component={SignInPage}/>
          <Route path="/sign-out" component={SignOutPage}/>
          <Route path="/token/:token/:target" component={TokenPage}/>
          <Route path="/lobbies" component={LobbyIndexPage}/>
          <AuthenticatedRoute exact={true} path="/game/:id" component={GamePage}/>
          <AuthenticatedRoute exact={true} path="/lobby/create" component={LobbyCreatePage}/>
          <AuthenticatedRoute exact={true} path="/lobby/:id" component={LobbyPage}/>
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}
