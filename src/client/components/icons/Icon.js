import {h, Component} from 'preact';
import '../../css/_icon.scss';

export default class Icon extends Component {
  componentDidMount() {
    this.base.innerHTML = this.props.svg;
  }

  render() {
    return (
      <span class="icon"/>
    );
  }
}
