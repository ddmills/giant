import {h, Component} from 'preact';

export default class RequireAuthentication extends Component {
  componentWillMount() {
    if (!this.props.authenticated) {
      // route('/sign-in', true);
    }
  }

  render({authenticated, children}) {
    if (authenticated) {
      return <div class="authenticated">{children}</div>;
    } else {
      return null;
    }
  }
};

