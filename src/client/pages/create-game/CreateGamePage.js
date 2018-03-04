import {h, Component} from 'preact';
import BasicPage from '../layout/BasicPage';
import Subheader from '../../components/subheader/Subheader';
import CreateGameForm from './CreateGameForm';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import {request} from '../../network/Request';

export default class CreateGamePage extends Component {
  state = {
    loading: false,
  }

  constructor(props) {
    super(props);

    this.onSubmitCreateGameForm = this.onSubmitCreateGameForm.bind(this);
    this.renderCreateGameForm = this.renderCreateGameForm.bind(this);
  }

  onSubmitCreateGameForm(props) {
    this.setState({
      loading: true
    });
    console.log('submit', props);
    request({
      method: 'post',
      url: '/api/game'
    }, (error, response) => {
      this.setState({
        loading: false,
      });
      console.log('response', response);
    });
  }

  renderCreateGameForm() {
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
