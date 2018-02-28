import {h, Component} from 'preact';
import {route} from 'preact-router';
import SignIn from '../../store/actions/SignInAction';
import Store from '../../store/Store';

export default class TokenPage extends Component {
  componentWillMount() {
    Store.dispatch(SignIn(this.props.token));

    route('/sign-in', true);
  }
}
