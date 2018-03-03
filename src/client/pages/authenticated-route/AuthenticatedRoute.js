import {h} from 'preact';
import {Route} from 'react-router-dom'
import SignInPage from '../sign-in/SignInPageContainer';

export default ({authenticated, component: Component, ...rest}) => {
  return <Route {...rest} component={authenticated ? Component : SignInPage}/>;
};
