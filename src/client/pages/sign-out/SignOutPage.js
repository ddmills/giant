import {h, Component} from 'preact';
import SignOutAction from '../../store/actions/SignOutAction';
import {store} from '../../store/Store';

export default class SignOutPage extends Component {
  componentWillMount() {
    store.dispatch(SignOutAction());
  }
}
