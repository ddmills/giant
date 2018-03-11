import {h} from 'preact';
import './alert.scss';

export default ({type, children}) => {
  if (!type) {
    type = "info"
  }

  return (
    <div class={`alert alert--${type}`}>
      {children}
    </div>
  );
}
