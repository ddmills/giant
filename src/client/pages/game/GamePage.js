import {h, Component} from 'preact';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import GameLayout from '../layout/GameLayout';
import ErrorPage from '../layout/ErrorPage';
import Hand from './Hand';
import BlueprintRow from './BlueprintRow';
import Card from '../../components/card/Card';

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
    if (!this.props.lobby) {
      return;
    }

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

    const currentPlayer = this.props.lobby.players.find((player) => player.id === this.props.lobby.currentPlayerId);
    const selfPlayer = this.props.lobby.players.find((player) => player.account.id === this.props.user.id);

    return ([
      <h2>Game {Math.round(this.state.time / 1000)} s</h2>,
      <button onClick={this.props.leaveLobby} class="btn btn--danger">
        Leave
      </button>,
      <button onClick={this.props.endTurn} class="btn btn--primary">
        End turn
      </button>,
      <button onClick={this.props.latency} class="btn btn--primary">
        Ping
      </button>,
      <p>Current turn: {currentPlayer.account.displayName}</p>,
      <BlueprintRow cards={this.props.lobby.blueprintRow.cards}/>,
      <Hand cards={selfPlayer.hand.cards}/>
    ]);
  }

  render({error, fatalError}) {
    if (fatalError) {
      return (
        <ErrorPage error={fatalError}/>
      );
    }

    return (
      <GameLayout>
        {this.renderContent()}
      </GameLayout>
    );
  }
}
