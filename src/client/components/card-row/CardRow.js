import {h, Component} from 'preact';
import DraggableCard from '../card/DraggableCard';
import CardContainer from '../card-container/CardContainer';
import './card-row.scss';

function renderCard(card, buyCard, hideCard, showCard) {
  return (
    <CardContainer isEmpty={card.hidden}>
      <DraggableCard
        {...card}
        onDrop={() => buyCard(card.id)}
        onDrag={() => hideCard(card.id)}
        onAbandonDrop={() => showCard(card.id)}
      />
    </CardContainer>
  );
}

export default class CardRow extends Component {
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

  render({buyCard}) {
    return (
      <div class="card-row">
        {this.state.cards.map((card) => renderCard(card, buyCard, this.hideCard.bind(this), this.showCard.bind(this)))}
      </div>
    );
  }
}
