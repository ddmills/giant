import {h} from 'preact';
import ConnectionStatus from '../../../components/connection-status/ConnectionStatus';
import './super-header.scss';

export default ({connected, latency}) => {
  return (
    <header class="super-header">
      <div class="container">
        hello world
        <span class="pull-right">
          <ConnectionStatus connected={connected} latency={latency}/>
        </span>
      </div>
    </header>
  );
}
