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

export default ({show, size, container}) => {
  if (container) {
    return (
      <div class="loading-indicator-container">
        {renderIndicator(size)}
      </div>
    );
  }

  return renderIndicator(size);
}
