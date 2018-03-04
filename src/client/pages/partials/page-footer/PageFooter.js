import {h} from 'preact';
import ConnectionStatus from '../../../components/connection-status/ConnectionStatusContainer';
import './page-footer.scss';

export default ({displayName, signOut}) => {
  return (
    <footer class="page-footer">
      <div class="container">
        <button class="pull-right btn btn--sm" onClick={signOut}>
          Sign out
        </button>
      </div>
    </footer>
  );
}
