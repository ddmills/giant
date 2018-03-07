import {h, Component} from 'preact';
import BasicPage from '../layout/BasicPage';
import Subheader from '../../components/subheader/Subheader';
import CreateGameForm from './CreateGameForm';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import {request} from '../../network/Request';
import {createGame} from '../../network/Api';

export default class CreateGamePage extends Component {
  state = {
    loading: false,
    error: undefined,
  }

  constructor(props) {
    super(props);

    this.onSubmitCreateGameForm = this.onSubmitCreateGameForm.bind(this);
    this.renderCreateGameForm = this.renderCreateGameForm.bind(this);
  }

  onSubmitCreateGameForm(properties) {
    this.setState({
      loading: true
    });

    createGame(properties, (error, game) => {
      this.setState({
        loading: false,
        error
      });
      console.log(game);
      if (!error) {
        this.props.onGameCreated(game);
      }
    });
  }

  renderCreateGameForm() {
    if (this.state.error) {
      return (
        <code>
          <pre class="code">
            {this.state.error}
          </pre>
        </code>
      );
    }

    if (this.state.loading) {
      return <LoadingIndicator container/>;
    }

    return [
      <Subheader description="This is a subheader component">Create new game</Subheader>,
      <CreateGameForm onSubmit={this.onSubmitCreateGameForm}/>
    ];
  }

  render() {
    return (
      <BasicPage size="mini">
        {this.renderCreateGameForm()}
      </BasicPage>
    );
  }
};
