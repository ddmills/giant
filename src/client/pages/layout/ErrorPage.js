import {h} from 'preact';
import BasicPage from './BasicPage';
import Subheader from '../../components/subheader/Subheader';

export default ({children, error}) => {
  return (
    <BasicPage>
      <Subheader description={error.message}>
        {error.status}
      </Subheader>
      <pre class="code">
        {JSON.stringify(error, null, 2)}
      </pre>
      {children}
    </BasicPage>
  );
}
