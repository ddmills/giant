import {h} from 'preact';
import {CSSTransition} from 'react-transition-group';
import './card-container.scss';

export default ({isFloating, children}) => {
  const classNames = ['card-container'];

  if (isFloating) {
    classNames.push('card-container--floating');
  }

  return (
    <CSSTransition in={isFloating} classNames="card-container--floating" timeout={5}>
      <div class={`${classNames.join(' ')}`}>
        {children}
      </div>
    </CSSTransition>
  );
}
