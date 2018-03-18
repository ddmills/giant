import {h} from 'preact';
import './card.scss';

function renderAttribute(attribute, value) {
  if (value === 0) {
    return;
  }

  return (
    <span class={`card-attribute card-attribute--${attribute}`} alt={attribute}>
      <span class='card-attribute-value'>
        {value}
      </span>
    </span>
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

export default ({name, description, value, cost, defense, attack, isEnabled}) => {
  return (
    <section class='card'>
      {renderDisableCurtain(isEnabled)}
      <div class="card-background">
        <img src={`https://placeimg.com/24${defense}/32${value}/nature`}/>
      </div>
      <div class="card-content">
        <div class="card-attributes">
          {renderAttribute('defense', defense)}
          {renderAttribute('value', value)}
          {renderAttribute('attack', attack)}
          {renderCost(cost)}
        </div>
        <h1 class="card-header">
          {name}
        </h1>
      </div>
    </section>
  );
}
