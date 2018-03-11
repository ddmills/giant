import {h, Component} from 'preact';
import BasicPage from '../layout/BasicPage';
import {Link} from 'react-router-dom';
import Subheader from '../../components/subheader/Subheader';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';

export default class LobbyBrowsePage extends Component {
  componentWillMount() {
    this.props.getLobbies();
  }

  renderLobbies(lobbies) {
    return lobbies.map((lobby) => {
      return (
        <li>
          <h4>{lobby.name}</h4>
          <Link to={`/lobby/${lobby.id}`} class="btn">
            join ({lobby.players.length}/{lobby.maxNumberOfPlayers})
          </Link>
        </li>
      );
    });
  }

  renderLobbyList() {
    return ([
      <ul>
        {this.renderLobbies(this.props.lobbies)}
      </ul>,
      <button class="btn" onClick={this.props.getLobbies}>
        Refresh
      </button>
    ]);
  }

  renderLoading() {
    return <LoadingIndicator container text="Loading lobbies…"/>;
  }

  renderEmpty() {
    return ([
      <p>No games found</p>,
      <Link to="/lobby/create" class="btn btn--primary">
        Create one
      </Link>,
      <button class="btn" onClick={this.props.getLobbies}>
        Refresh
      </button>
    ]);
  }

  renderContent() {
    if (!this.props.lobbies) {
      return this.renderLoading();
    }

    if (this.props.lobbies.length === 0) {
      return this.renderEmpty();
    }

    return this.renderLobbyList();
  }

  render({lobbies}) {
    return (
      <BasicPage>
        <Subheader>Browse games</Subheader>
        {this.renderContent()}
      </BasicPage>
    );
  }
};
