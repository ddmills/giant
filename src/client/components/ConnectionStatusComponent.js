import {h} from 'preact';
import '../css/components/connection-status-component.scss';

function addModifier(baseClassName, modifier) {
  return `${baseClassName} ${baseClassName}--${modifier}`;
}

export default ({connected, latency}) => {
  const baseClassName = 'connection-status';
  const className = addModifier(baseClassName, connected ? 'connected' : 'disconnected');

  return (
    <span class={className}>
      <span class='connection-status-info'>{latency > 0 ? latency : ''}</span>
      <span class='connection-status-indicator'></span>
    </span>
  );
}
