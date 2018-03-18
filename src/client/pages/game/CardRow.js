import {h} from 'preact';
import Card from '../../components/card/Card';
import './card-row.scss';

function renderCard(card, buyCard) {
  return (
    <li>
      <Card {...card}/>
      <button class='btn' onClick={() => buyCard(card.id)}>
        Purchase (-{card.cost})
      </button>
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
