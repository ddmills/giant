import {h, Component} from 'preact';
import {DropTarget} from 'react-dnd'
import Card from '../../components/card/Card';
import './hand.scss';

function renderCard(card) {
  return (
    <li>
      <Card {...card}/>
    </li>
  );
}

const Hand =({cards, connectDropTarget, isOver, canDrop, dropItem}) => {
  if (isOver && canDrop) {
    cards = [...cards, {
      ...dropItem,
      isEnabled: false,
    }];
  }

  return connectDropTarget(
    <ul class='hand'>
      {cards.map(renderCard)}
    </ul>
  );
}

const cardTarget = {

};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    dropItem: monitor.getItem(),
  }
}

export default DropTarget('CARD', cardTarget, collect)(Hand);
