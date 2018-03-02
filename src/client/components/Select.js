import {h, Component} from 'preact';

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  getValue(option) {
    return option.hasOwnProperty('value') ? option.value : option;
  }

  getLabel(option) {
    return option.hasOwnProperty('label') ? option.label : option;
  }

  handleOnChange(e) {
    e.preventDefault();

    const index = e.target.value;
    const option = this.props.options[index];
    const value = this.getValue(option);

    this.props.onChange && this.props.onChange(value);
  }

  renderOptions(options) {
    return options.map((option, index) => {
      return (
        <option
          value={index}
        >
          {this.getLabel(option)}
        </option>
      );
    });
  }

  render({options, value}) {
    const selected = options.find((option) => this.getValue(option) === value);
    const index = options.indexOf(selected);

    return (
      <select onChange={this.handleOnChange} value={index} class={this.props.class}>
        {this.renderOptions(options)}
      </select>
    );
  }
}
