import {h, Component} from 'preact';

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    e.preventDefault();

    const index = e.target.value;
    const option = this.props.options[index];

    this.props.onChange && this.props.onChange(option);
  }

  renderOptions(options) {
    return options.map((option, index) => {
      return (
        <option
          value={index}
        >
          {option.hasOwnProperty('label') ? option.label : option}
        </option>
      );
    });
  }

  render({options, value}) {
    const selected = options.indexOf(value);

    return (
      <select onChange={this.handleOnChange} value={selected}>
        {this.renderOptions(options)}
      </select>
    );
  }
}
