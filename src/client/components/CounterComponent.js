import {h} from 'preact';

export default ({count, onIncrement, onDecrement}) => {
  return (
    <div>
      <button class="btn" onClick={onIncrement}>increment</button>
      <span>{count}</span>
      <button class="btn" onClick={onDecrement}>decrement</button>
    </div>
  );
}
