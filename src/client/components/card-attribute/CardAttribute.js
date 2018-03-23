import {h} from 'preact';
import './card-attribute';

export default ({value, type}) => {
  return (
    <span class={`card-attribute card-attribute--${type}`} alt={`${value} ${type}`}>
      <span class='card-attribute-value'>
        {value}
      </span>
    </span>
  );
}
