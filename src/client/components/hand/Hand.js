import {h, Component} from 'preact';
import {DropTarget} from 'react-dnd'
import Card from '../card/Card';
import './hand.scss';

function disable(card) {
  return {
    ...card,
    isEnabled: false,
  };
}

class Hand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards,
    };
  }

  renderCard(card) {
    return (
      <li>
        <Card {...card}/>
      </li>
    );
  }

  componentWillReceiveProps({dropResult, dropItem, cards}) {
    if (dropResult && !this.props.dropResult) {
      this.setState({
        cards: [...this.state.cards, disable(dropItem)]
      });
    } else if (!(this.props.dropItem && !dropItem)) {
      this.setState({
        cards
      });
    }
  }

  render ({connectDropTarget, isOver, canDrop, dropItem}) {
    const cards = [...this.state.cards];

    if (isOver && canDrop) {
      cards.push(disable(dropItem));
    }

    return connectDropTarget(
      <ul class='hand'>
        {cards.map(this.renderCard)}
      </ul>
    );
  }
}

const cardTarget = {};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    dropItem: monitor.getItem(),
    dropResult: monitor.getDropResult(),
  }
}

export default DropTarget('CARD', cardTarget, collect)(Hand);
