import {h, Component} from 'preact';
import {DragDropContextProvider} from 'react-dnd';

import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import GameLayout from '../layout/GameLayout';
import ErrorPage from '../layout/ErrorPage';
import CardRow from '../../components/card-row/CardRow';
import HTML5Backend from 'react-dnd-html5-backend'
import DragLayer from '../../components/drag-layer/DragLayer';
import PlayerDrawer from '../../components/player-drawer/PlayerDrawer';

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

    // this.setState({
    //   time
    // });
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.lobby && newProps.lobby) {
      console.log(newProps.lobby);
    }
  }

  renderContent() {
    if (this.props.error) {
      return (
        <pre class="code">
          {JSON.stringify(this.props.error, null, 2)}
        </pre>
      );
    }

    if (!this.props.lobby) {
      return <LoadingIndicator container text="Loading game…"/>;
    }

    const currentPlayer = this.props.lobby.players.find((player) => player.id === this.props.lobby.currentPlayerId);
    const selfPlayer = this.props.lobby.players.find((player) => player.account.id === this.props.user.id);

    return (
        <div>
          <DragLayer/>
          <h2>{Math.round(this.state.time / 1000)} s</h2>
          <button onClick={this.props.leaveLobby} class="btn btn--danger">
            Leave
          </button>
          <button onClick={this.props.endTurn} class="btn btn--primary">
            End turn
          </button>
          <button onClick={this.props.latency} class="btn btn--primary">
            Ping
          </button>
          <p>Current turn: {currentPlayer.account.displayName}</p>
          <CardRow cards={this.props.lobby.blueprintRow.cards} buyCard={this.props.buyBlueprint}/>
          <CardRow cards={this.props.lobby.heroRow.cards} buyCard={this.props.buyHero}/>
          <PlayerDrawer player={selfPlayer}/>
        </div>
    );
  }

  render({error, fatalError}) {
    if (fatalError) {
      return (
        <ErrorPage error={fatalError}/>
      );
    }

    return (
      <GameLayout>
        <DragDropContextProvider backend={HTML5Backend}>
          {this.renderContent()}
        </DragDropContextProvider>
      </GameLayout>
    );
  }
}
