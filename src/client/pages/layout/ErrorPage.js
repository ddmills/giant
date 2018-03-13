import {h} from 'preact';
import BasicLayout from './BasicLayout';
import Subheader from '../../components/subheader/Subheader';

export default ({children, error}) => {
  return (
    <BasicLayout>
      <Subheader description={error.message}>
        {error.code}
      </Subheader>
      <pre class="code">
        {JSON.stringify(error, null, 2)}
      </pre>
      {children}
    </BasicLayout>
  );
}
