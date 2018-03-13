import {h, Component} from 'preact';
import {Link} from 'react-router-dom';
import BasicLayout from '../layout/BasicLayout';
import ErrorPage from '../layout/ErrorPage';
import Subheader from '../../components/subheader/Subheader';
import Alert from '../../components/alert/Alert';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import PlayerList from './PlayerList';

export default class LobbyPage extends Component {
  componentWillMount() {
    this.props.clearError();

    if (!this.props.lobby) {
      this.props.joinLobby();
    } else if (this.props.lobby.id !== this.props.lobbyId) {
      this.props.redirect(`/lobby/${this.props.lobby.id}`);
    } else {
      this.props.loadLobby();
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.lobby) {
      if (!newProps.lobby) {
        newProps.redirect('/');
      } else if (newProps.lobby.id !== newProps.lobbyId) {
        newProps.redirect(`/lobby/${newProps.lobby.id}`);
      }
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
        <button onClick={this.props.startLobby} class="btn btn--primary">
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

  renderContent() {
    if (this.props.lobby.isDisbanded || (this.props.error && this.props.error.fatal)) {
      return;
    }

    return ([
      <pre class="code">
        {JSON.stringify(this.props.lobby, null, 2)}
      </pre>,
      <span class="pull-right">
        {this.renderActions()}
      </span>
    ]);
  }

  renderDisbandedMessage() {
    if (this.props.lobby.isDisbanded) {
      return ([
        <Alert type="danger">
          This lobby has been abandoned…
        </Alert>,
        <button onClick={this.props.leaveLobby} class="btn btn--danger">
          Leave lobby
        </button>
      ]);
    }
  }

  render({error, lobbyId, user, lobby}) {
    if (error && error.fatal) {
      return (
        <ErrorPage error={error}/>
      );
    }

    if (!lobby) {
      return (
        <BasicLayout>
          <LoadingIndicator text="Loading lobby…" container/>
        </BasicLayout>
      );
    }

    return (
      <BasicLayout>
        {this.renderNonFatalError(error)}
        {this.renderDisbandedMessage()}
        {this.renderContent()}
      </BasicLayout>
    );
  }
};
