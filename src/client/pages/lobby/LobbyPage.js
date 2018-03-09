import {h, Component} from 'preact';
import BasicPage from '../layout/BasicPage';
import Subheader from '../../components/subheader/Subheader';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import PlayerList from './PlayerList';

export default class LobbyPage extends Component {
  componentWillMount() {
    if (!this.props.isLobbyLoaded) {
      this.props.getLobby(this.props.lobbyId);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isLobbyLoaded && !newProps.isLobbyFull && !newProps.isCurrentUserPlayer) {
      this.props.joinLobby(this.props.lobbyId);
    }
  }

  renderStartButton() {
    if (!this.props.isLobbyOwner) {
      return;
    }

    return(
      <button
        class="btn btn--primary pull-right"
        onClick={this.props.startGame}
      >
        Start game
      </button>
    );
  }

  renderWaitingText() {
    if (this.props.isLobbyOwner) {
      return 'Press start when ready…';
    } else {
      return `Waiting for ${this.props.owner.displayName} to start the game…`;
    }
  }

  render({isLobbyLoaded, lobbyId, lobby, user, isCurrentUserPlayer}) {
    if (!isLobbyLoaded && !isCurrentUserPlayer) {
      return (
        <BasicPage>
          <LoadingIndicator text="Loading lobby…" container/>
        </BasicPage>
      );
    }

    return (
      <BasicPage>
        <Subheader description={lobby.name}>
          Lobby
        </Subheader>
        <PlayerList
          players={lobby.players}
          ownerId={lobby.ownerId}
          userId={user.id}
          onLeave={() => this.props.leaveLobby(lobbyId)}
        />
        <p class="pull-left">
          {this.renderWaitingText()}
        </p>
        {this.renderStartButton()}
      </BasicPage>
    );
  }
};
