import {h, Component} from 'preact';
import {Link} from 'react-router-dom';
import BasicPage from '../layout/BasicPage';
import ErrorPage from '../layout/ErrorPage';
import Subheader from '../../components/subheader/Subheader';
import Alert from '../../components/alert/Alert';
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

  renderActions() {
    const actions = [];

    actions.push(
      <button onClick={this.props.leaveLobby} class="btn btn--danger">
        Leave lobby
      </button>
    );

    if (this.props.isOwner) {
      actions.push(
        <button onClick={this.props.addBot} class="btn btn--default">
          Add bot
        </button>
      );
      actions.push(
        <button disabled onClick={this.props.startGame} class="btn btn--primary">
          Start game
        </button>
      );
    }

    return actions;
  }

  renderNonFatalError(error) {
    if (!error) {
      return;
    }

    return (
      <Alert type="danger">
        {error.message}
      </Alert>
    );
  }

  render({error, lobbyId, user, lobby}) {
    if (error && error.fatal) {
      return (
        <ErrorPage error={error}/>
      );
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
        {this.renderNonFatalError(error)}
        <pre class="code">
          {JSON.stringify(lobby, null, 2)}
        </pre>
        <span class="pull-right">
          {this.renderActions()}
        </span>
      </BasicPage>
    );
  }
};
