import {h, Component} from 'preact';
import BasicPage from '../layout/BasicPage';
import ErrorPage from '../layout/ErrorPage';
import Subheader from '../../components/subheader/Subheader';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';

export default class LobbyPage extends Component {
  redirectToLobby(lobby) {
    this.props.redirect(`/lobby/${lobby.id}`);
  }

  componentWillMount() {
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
      <BasicPage>
        <LoadingIndicator container text="Creating lobby…"/>
      </BasicPage>
    );
  }
};
