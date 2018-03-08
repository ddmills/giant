import {h, Component} from 'preact';
import BasicPage from '../layout/BasicPage';
import Subheader from '../../components/subheader/Subheader';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import PlayerList from './PlayerList';

export default class LobbyPage extends Component {
  componentWillMount() {
    if (!this.props.isLobbyLoaded) {
      this.props.getLobby(this.props.id);
    }
  }

  render({isLobbyLoaded, lobby, startGame, user}) {
    if (!isLobbyLoaded) {
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
        />
        <button
          class="btn btn--primary pull-right"
          onClick={startGame}
        >
          Start game
        </button>
      </BasicPage>
    );
  }
};

