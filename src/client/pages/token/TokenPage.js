import {h, Component} from 'preact';
import {route} from 'preact-router';
import SetToken from '../../store/actions/SetToken';
import Store from '../../store/Store';

export default class TokenPage extends Component {
  componentWillMount() {
    Store.dispatch(SetToken(this.props.token));

    route('/sign-in');
  }
}
