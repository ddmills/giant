import {h, Component} from 'preact';
import BasicPage from '../layout/BasicPage';
import Subheader from '../../components/subheader/Subheader';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';

export default class LobbyPage extends Component {
  componentWillMount() {
    if (!this.props.isLobbyLoaded) {
      this.props.getLobby(this.props.id);
    }
  }

  renderContent() {
    if (!this.props.isLobbyLoaded) {
      return <LoadingIndicator text="Loading lobby&hellip;" container/>
    }

    return ([
      <Subheader description={this.props.lobby.name}>
        Lobby
      </Subheader>,
      <pre class="code">{JSON.stringify(this.props.lobby, null, 2)}</pre>
    ]);
  }

  render({isLobbyLoaded, lobby}) {
    return (
      <BasicPage>
        {this.renderContent()}
      </BasicPage>
    );
  }
};

