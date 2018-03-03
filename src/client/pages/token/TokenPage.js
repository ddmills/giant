import {h, Component} from 'preact';
import {Redirect} from 'react-router-dom';

export default class TokenPage extends Component {
  componentWillMount() {
    this.props.signIn(this.props.token);
    this.props.redirect(this.props.targetUri);
  }

  render() {
    return null;
  }
}
