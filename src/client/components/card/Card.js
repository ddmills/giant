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

export default ({name, description, value, cost, defense, attack}) => {
  return (
    <section class="card">
      <div class="card-background">
        <img src={`https://placeimg.com/24${defense}/32${value}/nature`}/>
      </div>
      <div class="card-content">
        <div class="card-attributes">
          {renderAttribute('defense', defense)}
          {renderAttribute('value', value)}
          {renderAttribute('attack', attack)}
          <span class="card-cost">
            {cost}
          </span>
        </div>
        <footer class="card-footer">
          <h1 class="card-header">
            {name}
          </h1>
        </footer>
      </div>
    </section>
  );
}
