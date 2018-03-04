import {h, Component} from 'preact';
import BasicPage from '../layout/BasicPage';
import {Link, Redirect, Route} from 'react-router-dom';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';

export default class SignInPage extends Component {
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.redirect(this.props.targetUri);
    } else {
      window.location.href = `/auth/sign-in?target=${encodeURIComponent(this.props.targetUri)}`;
    }
  }

  render({authenticated, component: Component, ...props}) {
    if (authenticated) {
      return <Redirect to='/'/>;
    } else {
      return <LoadingIndicator container/>;
    }
  }
}
