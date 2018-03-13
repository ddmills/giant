import {h, Component} from 'preact';
import BasicLayout from '../layout/BasicLayout';
import ErrorPage from '../layout/ErrorPage';
import Subheader from '../../components/subheader/Subheader';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';

export default class LobbyPage extends Component {
  redirectToLobby(lobby) {
    this.props.redirect(`/lobby/${lobby.id}`);
  }

  componentWillMount() {
    this.props.clearError();

    if (this.props.lobby) {
      this.redirectToLobby(this.props.lobby);
    } else {
      this.props.createLobby();
    }
  }

  componentWillReceiveProps({lobby}) {
    if (lobby) {
      this.redirectToLobby(lobby);
    }
  }

  render({error, lobby}) {
    if (!lobby && error) {
      return (
        <ErrorPage error={error}/>
      );
    }

    return (
      <BasicLayout>
        <LoadingIndicator container text="Creating lobby…"/>
      </BasicLayout>
    );
  }
};
