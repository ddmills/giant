import {h} from 'preact';
import './connection-status-component.scss';

function addModifier(baseClassName, modifier) {
  return `${baseClassName} ${baseClassName}--${modifier}`;
}

export default ({connected, latency}) => {
  const baseClassName = 'connection-status';
  const className = addModifier(baseClassName, connected ? 'connected' : 'disconnected');
  const info = connected ? latency : 'no connection';

  return (
    <span class={className}>
      <span class='connection-status-info'>{info}</span>
      <span class='connection-status-indicator'></span>
    </span>
  );
}
