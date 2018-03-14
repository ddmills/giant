import {h, Component} from 'preact';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import GameLayout from '../layout/GameLayout';
import ErrorPage from '../layout/ErrorPage';

export default class GamePage extends Component {
  state = {
    time: 0,
  }

  componentWillMount() {
    this.props.getLobby();
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const time = Date.now() - this.props.lobby.startTime;

    this.setState({
      time
    });
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.lobby && newProps.lobby) {
      console.log(newProps.lobby);
    }
  }

  renderContent() {
    if (this.props.error) {
      return <p>error</p>;
    }

    if (!this.props.lobby) {
      return <LoadingIndicator container text="Loading game…"/>;
    }

    return (
      <h2>Game {Math.round(this.state.time / 1000)} s</h2>
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
