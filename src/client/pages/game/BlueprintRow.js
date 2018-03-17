import {h} from 'preact';
import Card from '../../components/card/Card';
import './blueprint-row.scss';

function renderCard(card) {
  return (
    <li>
      <Card {...card}/>
    </li>
  );
}

export default ({cards}) => {
  return (
    <ul class="blueprint-row">
      {cards.map(renderCard)}
    </ul>
  );
}
