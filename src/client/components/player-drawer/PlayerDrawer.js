import {h} from 'preact';
import './player-drawer.scss';
import CardAttribute from '../card-attribute/CardAttribute';
import Hand from '../hand/Hand';
import CardRow from '../card-row/CardRow';

export default ({player}) => {
  return (
    <div class="player-drawer">
      <CardAttribute type="value" value={player.currentValue}/>
      <Hand cards={player.hand.cards}/>
      <CardRow cards={player.buildingDeck.cards} buyCard={() => {}}/>
    </div>
  );
}
