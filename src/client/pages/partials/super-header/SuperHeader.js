import {h} from 'preact';
import ConnectionStatus from '../../../components/connection-status/ConnectionStatusContainer';
import './super-header.scss';

export default () => {
  return (
    <header class="super-header">
      <div class="container">
        hello world
        <span class="pull-right">
          <ConnectionStatus/>
        </span>
      </div>
    </header>
  );
}
