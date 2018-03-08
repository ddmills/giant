import {h, Component} from 'preact';
import BasicPage from '../layout/BasicPage';
import Subheader from '../../components/subheader/Subheader';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';

export default class LobbyPage extends Component {
  componentWillMount() {
    this.props.createLobby(this.props.onLobbyCreated);
  }

  render() {
    return (
      <BasicPage>
        <LoadingIndicator container text="Creating lobby…"/>
      </BasicPage>
    );
  }
};
