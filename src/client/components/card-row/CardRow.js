import {h} from 'preact';
import DraggableCard from '../card/DraggableCard';
import './card-row.scss';

function renderCard(card, buyCard) {
  return (
    <li>
      <DraggableCard {...card} onDrop={() => buyCard(card.id)}/>
    </li>
  );
}

export default ({cards, buyCard}) => {
  return (
    <ul class="card-row">
      {cards.map((card) => renderCard(card, buyCard))}
    </ul>
  );
}
