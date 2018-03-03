import {h, Component} from 'preact';
import BasicPage from '../layout/BasicPage';
import {Link} from 'react-router-dom';

export default class SignInPage extends Component {
  componentWillMount() {
    if (this.props.authenticated) {
      // route('/');
    }
  }

  render({authenticated}) {
    if (authenticated) {
      return null;
    }

    return (
      <BasicPage>
        <h1>Sign in</h1>
        <Link to="/">Home</Link>
        <a href="auth/sign-in">Sign in with Steam</a>
      </BasicPage>
    );
  }
}
