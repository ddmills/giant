import {h, Component} from 'preact';
import {route} from 'preact-router';
import SignOutAction from '../../store/actions/SignOutAction';
import Store from '../../store/Store';

export default class TokenPage extends Component {
  componentWillMount() {
    Store.dispatch(SignOutAction());

    route('/');
  }
}
