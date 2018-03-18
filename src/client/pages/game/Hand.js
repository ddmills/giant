import {h, Component} from 'preact';
import Card from '../../components/card/Card';
import './hand.scss';

function renderCard(card) {
  return (
    <li>
      <Card {...card}/>
    </li>
  );
}

export default ({cards}) => {
  return (
    <ul class="hand">
      {cards.map(renderCard)}
    </ul>
  );
}
