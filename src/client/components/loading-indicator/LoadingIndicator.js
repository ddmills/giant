import {h} from 'preact';
import './loading-indicator.scss'

const renderIndicator = (size) => {
  return (
    <span class="loading-indicator">
      <span class="loading-indicator-tile loading-indicator-tile--left"/>
      <span class="loading-indicator-tile loading-indicator-tile--right"/>
    </span>
  );
}

const renderText = (text) => {
  if (!text) {
    return;
  }

  return (
    <p class="loading-indicator-text">
      {text}
    </p>
  );
}

export default ({show, size, text, container}) => {
  if (container) {
    return (
      <div class="loading-indicator-container">
        {renderIndicator(size)}
        {renderText(text)}
      </div>
    );
  }

  return renderIndicator(size);
}
