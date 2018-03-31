import {h} from 'preact';
import CardContainer from '../card-container/CardContainer';
import Card from '../card/Card';

function renderCard(card) {
  return (
    <CardContainer>
      <Card {...card}/>
    </CardContainer>
  );
}

export default ({enemy}) => {
  return (
    <div>
      {enemy.buildingDeck.cards.map((card) => renderCard(card))}
    </div>
  );
}
