import {h, Component} from 'preact';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import GameLayout from '../layout/GameLayout';
import ErrorPage from '../layout/ErrorPage';

export default class GamePage extends Component {
  componentWillMount() {
    this.props.getLobby();
  }

  renderContent() {
    if (this.props.error) {
      return <p>error</p>;
    }

    if (!this.props.lobby) {
      return <LoadingIndicator container text="Loading game…"/>;
    }

    return (
      <pre class="code">
        {JSON.stringify(this.props.lobby, null, 2)}
      </pre>
    );
  }

  render({error, fatalError}) {
    if (fatalError) {
      return (
        <ErrorPage error={fatalError}/>
      );
    }

    // console.log(this.props);

    return (
      <GameLayout>
        {this.renderContent()}
      </GameLayout>
    );
  }
}
