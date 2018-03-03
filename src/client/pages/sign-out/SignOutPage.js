import {h, Component} from 'preact';
import SignOutAction from '../../store/actions/SignOutAction';
import {store} from '../../store/Store';

export default class TokenPage extends Component {
  componentWillMount() {
    store.dispatch(SignOutAction());

    // route('/');
  }
}
