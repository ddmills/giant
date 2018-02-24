import {h, Component} from 'preact';
import {greet} from './network/Client';

export default (props) => {
  return (
    <div>
      <h3>Root</h3>
      <p>{props.name}</p>
      <h1 className="title">giant</h1>
      <div className="container typography">
        <button onClick={greet}>greet</button>
      </div>
    </div>
  );
}
