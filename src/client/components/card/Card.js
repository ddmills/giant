import {h} from 'preact';
import CardAttribute from '../card-attribute/CardAttribute';
import './card.scss';

function renderAttribute(attribute, value) {
  if (value === 0) {
    return;
  }

  return (
    <CardAttribute type={attribute} value={value}/>
  );
}

function renderCost(cost) {
  if (cost === 0) {
    return;
  }

  return (
    <span class="card-cost">
      {cost}
    </span>
  );
}

function renderDisableCurtain(isEnabled) {
  if (isEnabled) {
    return;
  }

  return <div class="card-curtain"/>;
}

function getClass(value, defense, attack, points) {
  return Object.entries({value, defense, attack, points}).reduce((largest, current) => {
    return current[1]  > largest[1] ? current : largest;
  }, ['basic', 0])[0];
}

export default ({name, description, value, cost, defense, attack, points, isEnabled, isDragging}) => {
  const className = `card card--${getClass(value, defense, attack, points)}`;

  return (
    <section class={className}>
      {renderDisableCurtain(isEnabled)}
      <div class="card-background">
        <img src={`https://placeimg.com/24${name.length % 10}/32${value}`}/>
      </div>
      <div class="card-content">
        {renderCost(cost)}
        <div class="card-attributes">
          {renderAttribute('defense', defense)}
          {renderAttribute('value', value)}
          {renderAttribute('attack', attack)}
          {renderAttribute('points', points)}
        </div>
        <span class="card-header">
          {name}
        </span>
      </div>
    </section>
  );
}
