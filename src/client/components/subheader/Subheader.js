import {h} from 'preact';
import './subheader.scss';

function renderDescription(description) {
  if (description) {
      return (
        <p class="subheader-description">
          {description}
        </p>
      );
  }
  return null;
}

export default ({description, children}) => {
  return (
    <header class="subheader">
      <h2 class="subheader-heading">
        {children}
      </h2>
      {renderDescription(description)}
    </header>
  );
}
