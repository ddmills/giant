import {h, Component} from 'preact';
import {route} from 'preact-router';
import BasicPage from '../layout/BasicPage';

export default class SignInPage extends Component {
  componentWillMount() {
    if (this.props.isAlreadySignedIn) {
      route('/', true);
    }
  }

  render() {
    if (this.props.isAlreadySignedIn) {
      return null;
    }

    return (
      <BasicPage>
        <h1>Sign in</h1>
        <a href="auth/sign-in">Sign in with Steam</a>
      </BasicPage>
    );
  }
}
