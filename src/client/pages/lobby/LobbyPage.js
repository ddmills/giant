import {h, Component} from 'preact';
import {Link} from 'react-router-dom';
import BasicPage from '../layout/BasicPage';
import Subheader from '../../components/subheader/Subheader';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import PlayerList from './PlayerList';

export default class LobbyPage extends Component {
  componentWillMount() {
    if (!this.props.lobby) {
      this.props.joinLobby(this.props.lobbyId);
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.lobby && !newProps.lobby) {
      newProps.redirect('/');
    }
  }

  render({error, lobbyId, user, lobby}) {
    if (error) {
      return <h2>{error}</h2>
    }

    if (!lobby) {
      return (
        <BasicPage>
          <LoadingIndicator text="Loading lobby…" container/>
        </BasicPage>
      );
    }

    return (
      <BasicPage>
        <pre class="code">
          {JSON.stringify(lobby, null, 2)}
        </pre>
        <button onClick={this.props.leaveLobby} class="btn btn--danger">
          Leave lobby
        </button>
      </BasicPage>
    );
  }
};
