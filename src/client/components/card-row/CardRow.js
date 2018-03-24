import {h} from 'preact';
import DraggableCard from '../card/DraggableCard';
import './card-row.scss';

function renderCard(card, buyCard) {
  return (
    <div class="card-container">
      <DraggableCard {...card} onDrop={() => buyCard(card.id)}/>
    </div>
  );
}

export default ({cards, buyCard}) => {
  return (
    <div class="card-row">
      {cards.map((card) => renderCard(card, buyCard))}
    </div>
  );
}
