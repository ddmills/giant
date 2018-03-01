import {h, Component} from 'preact';
import Select from '../../components/Select';
import 'linkstate/polyfill';

export default class CreateGameForm extends Component {
  state = {
    formData: {
      name: 'bill',
      description: 'desco',
      turnDuration: 30,
      numberOfPlayers: 1,
      isPublic: true,
    }
  }

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
        <div class="form-group">
          <label class="form-label">Name</label>
          <input
            class="form-control"
            type="text"
            value={this.state.formData.name}
            onChange={this.linkState('formData.name')}
          />
        </div>

        <div class="form-group">
          <label class="form-label">Description</label>
          <input
            class="form-control"
            type="text"
            value={this.state.formData.description}
            onChange={this.linkState('formData.description')}
          />
        </div>

        <div class="form-group">
          <label class="form-label">Maximum turn duration</label>
          <input
            class="form-control"
            type="number"
            value={this.state.formData.turnDuration}
            onChange={this.linkState('formData.turnDuration')}
          />
        </div>

        <div class="form-group">
          <label class="form-label">Number of players</label>
          <Select
            options={[2, 3, 4, 5]}
            value={this.state.formData.numberOfPlayers}
            onChange={this.linkState('formData.numberOfPlayers')}
          />
        </div>

        <div class="form-group">
          <label class="form-label">Public</label>
          <input
            type="radio"
            name="public"
            value={true}
            checked={this.state.formData.isPublic}
            onChange={this.setIsPublicTrue}
          />
        </div>

        <div class="form-group">
          <label class="form-label">Private</label>
          <input
            type="radio"
            name="public"
            value={false}
            checked={!this.state.formData.isPublic}
            onChange={this.setIsPublicFalse}
          />
        </div>

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
