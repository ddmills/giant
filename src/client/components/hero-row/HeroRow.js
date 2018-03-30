import {h, Component} from 'preact';
import './hero-row.scss';
import CardContainer from '../card-container/CardContainer';
import DraggableCard from '../card/DraggableCard';

export default class HeroRow extends Component {
  state = {
    cards: []
  }

  componentWillReceiveProps({cards}) {
    if (cards) {
      this.setState({
        cards,
      });
    }
  }

  hideCard(cardId) {
    const cards = [...this.state.cards];
    const index = cards.findIndex((card) => card.id === cardId);

    cards[index].hidden = true;

    this.setState({
      cards,
    });
  }

  showCard(cardId) {
    const cards = [...this.state.cards];
    const index = cards.findIndex((card) => card.id === cardId);

    cards[index].hidden = false;

    this.setState({
      cards,
    });
  }

  renderCard(card) {
    return (
      <CardContainer isEmpty={card.hidden}>
        <DraggableCard
          {...card}
          onDrop={() => this.props.buyHero(card.id)}
          onDrag={() => this.hideCard(card.id)}
          onAbandonDrop={() => this.showCard(card.id)}
        />
      </CardContainer>
    );
  }

  render() {
    return (
      <div class="hero-row">
        {this.state.cards.map((card) => this.renderCard(card))}
      </div>
    );
  }
}
