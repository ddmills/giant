import {h, Component} from 'preact';
import SignOutAction from '../../store/actions/SignOutAction';
import {store} from '../../store/Store';
import {replace as GoToLocation} from 'react-router-redux';

export default class SignOutPage extends Component {
  componentWillMount() {
    store.dispatch(SignOutAction());
    store.dispatch(GoToLocation('/'));
  }
}
