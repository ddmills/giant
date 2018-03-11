import {h} from 'preact';
import {Link} from 'react-router-dom';
import './page-footer.scss';

export default () => {
  return (
    <footer class="page-footer">
      <div class="container">
        <Link to="/sign-out" class="pull-right btn btn--sm">
          Sign out
        </Link>
      </div>
    </footer>
  );
}
