import {h, Component} from 'preact';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import {signOut} from '../../network/Api';

export default class SignOutPage extends Component {
  componentWillMount() {
    signOut();
  }

  render() {
    return <LoadingIndicator text="Signing out…" container/>
  }
}
