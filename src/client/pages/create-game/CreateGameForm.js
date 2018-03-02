import {h, Component} from 'preact';
import Select from '../../components/Select';
import 'linkstate/polyfill';

export default class CreateGameForm extends Component {
  state = {
    formData: {
      name: 'The game instance name',
      description: 'The game instance description',
      turnDuration: 60,
      numberOfPlayers: 2,
      isPublic: true,
    }
  }

  turnDurationOptions = [{
    label: 'Bullet (10 seconds)',
    value: 10,
  }, {
    label: 'Blitz (15 seconds)',
    value: 15,
  }, {
    label: 'Rapid (20 seconds)',
    value: 20,
  }, {
    label: 'Normal (30 seconds)',
    value: 30,
  }, {
    label: 'Slow (1 minute)',
    value: 60,
  }, {
    label: 'Studious (2 minutes)',
    value: 120,
  }, {
    label: 'Yawn (10 minutes)',
    value: 600,
  }, {
    label: 'Unlimited',
    value: -1,
  }]

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.setIsPublicTrue = this.setIsPublicTrue.bind(this);
    this.setIsPublicFalse = this.setIsPublicFalse.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.formData);
  }

  setIsPublic(isPublic) {
    this.setState({
      formData: {
        ...this.state.formData,
        isPublic
      }
    });
  }

  setIsPublicTrue(e) {
    e.preventDefault();
    this.setIsPublic(true);
  }

  setIsPublicFalse(e) {
    e.preventDefault();
    this.setIsPublic(false);
  }

  render({}, {name, description}) {
    return (
      <form>
        <label class="form-group">
          <span class="form-label">Name</span>
          <input
            class="form-control"
            type="text"
            value={this.state.formData.name}
            onChange={this.linkState('formData.name')}
          />
        </label>

        <label class="form-group">
          <span class="form-label">Description</span>
          <input
            class="form-control"
            type="text"
            value={this.state.formData.description}
            onChange={this.linkState('formData.description')}
          />
        </label>

        <label class="form-group">
          <span class="form-label">Maximum turn duration</span>
          <Select
            class="form-control"
            options={this.turnDurationOptions}
            value={this.state.formData.turnDuration}
            onChange={this.linkState('formData.turnDuration')}
          />
        </label>

        <label class="form-group">
          <span class="form-label">Number of players</span>
          <span class="form-note">You choose who can see this game</span>
          <Select
            class="form-control"
            options={[2, 3, 4, 5]}
            value={this.state.formData.numberOfPlayers}
            onChange={this.linkState('formData.numberOfPlayers')}
          />
        </label>

        <label class="form-group">
          <span class="form-label">Public</span>
          <span class="form-note">Anyone can see and join this game</span>
          <input
            type="radio"
            class="form-control"
            name="public"
            value={true}
            checked={this.state.formData.isPublic}
            onChange={this.setIsPublicTrue}
          />
        </label>

        <label class="form-group">
          <span class="form-label">Private</span>
          <span class="form-note">You choose who can see this game</span>
          <input
            type="radio"
            class="form-control"
            name="public"
            value={false}
            checked={!this.state.formData.isPublic}
            onChange={this.setIsPublicFalse}
          />
        </label>

        <button
          class="btn btn--primary pull-right"
          type="submit"
          onClick={this.onSubmit}
        >
          Create game
        </button>
      </form>
    );
  }
}
