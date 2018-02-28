import {h} from 'preact';
import BasicPage from '../layout/BasicPage';

export default ({user}) => {
  return (
    <BasicPage>
      <section>
        <h2>hello {user.displayName}</h2>
        <pre class="code">
          <code>
            {JSON.stringify(user, null, 2)}
          </code>
        </pre>
      </section>
    </BasicPage>
  );
};

