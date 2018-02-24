import {h} from 'preact';
import {Link} from 'preact-router/match';

export default (props) => {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/sign-in">Sign in</Link>
    </div>
  );
}
