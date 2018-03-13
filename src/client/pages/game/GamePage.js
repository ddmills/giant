import {h, Component} from 'preact';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import GameLayout from '../layout/GameLayout';

export default class GamePage extends Component {
  componentWillMount() {
    this.props.loadGame();
  }

  renderContent() {
    if (!this.props.game) {
      return <LoadingIndicator container text="Loading game…"/>;
    }

    return (
      <pre class="code">
        {JSON.stringify(this.props.game, null, 2)}
      </pre>
    );
  }

  render({game}) {
    return (
      <GameLayout>
        {this.renderContent()}
      </GameLayout>
    );
  }
}
