import {h, Component} from 'preact';
import BasicPage from '../layout/BasicPage';
import Subheader from '../../components/subheader/Subheader';
import CreateGameForm from './CreateGameForm';

export default class CreateGamePage extends Component {
  constructor(props) {
    super(props);

    this.onSubmitCreateGameForm = this.onSubmitCreateGameForm.bind(this);
  }

  onSubmitCreateGameForm(props) {
    console.log('submit', props);
  }

  render() {
    return (
      <BasicPage>
        <Subheader description="This is a subheader component">Create new game</Subheader>
        <CreateGameForm onSubmit={this.onSubmitCreateGameForm}/>
      </BasicPage>
    );
  }
};

