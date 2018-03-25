import {h} from 'preact';
import DraggableCard from '../card/DraggableCard';
import CardContainer from '../card-container/CardContainer';
import './card-row.scss';

function renderCard(card, buyCard) {
  return (
    <CardContainer>
      <DraggableCard {...card} onDrop={() => buyCard(card.id)}/>
    </CardContainer>
  );
}

export default ({cards, buyCard}) => {
  return (
    <div class="card-row">
      {cards.map((card) => renderCard(card, buyCard))}
    </div>
  );
}
