import {h} from 'preact';
import ConnectionStatus from '../../../components/connection-status/ConnectionStatusContainer';
import './super-header.scss';

export default ({displayName}) => {
  return (
    <header class="super-header">
      <div class="container">
        {displayName}
        <span class="pull-right">
          <ConnectionStatus/>
        </span>
      </div>
    </header>
  );
}
