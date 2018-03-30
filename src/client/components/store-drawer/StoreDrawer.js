import {h, Component} from 'preact';
import BlueprintRow from '../blueprint-row/BlueprintRow';
import HeroRow from '../hero-row/HeroRow';
import './store-drawer.scss';

export default class StoreDrawer extends Component {
  state = {
    opened: false,
  }

  toggleOpen() {
    this.setState({
      opened: !this.state.opened
    });
  }

  render() {
    const className = this.state.opened ? 'store-drawer store-drawer--open' : 'store-drawer';

    return (
      <div class={className}>
        <button class='store-drawer-tab' onClick={this.toggleOpen.bind(this)}>
          {this.state.opened ? 'Close' : 'Open'}
        </button>
        <div class='store-drawer-content'>
          <BlueprintRow
            cards={this.props.blueprintRow.cards}
            buyBlueprint={this.props.buyBlueprint}
          />
          <HeroRow
            cards={this.props.heroRow.cards}
            buyHero={this.props.buyHero}
          />
        </div>
      </div>
    );
  }
}
