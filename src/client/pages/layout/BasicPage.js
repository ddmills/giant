import {h} from 'preact';
import PageHeader from '../partials/page-header/PageHeaderContainer';

export default ({children}) => {
  return (
    <div>
      <PageHeader/>
      <div className="container">
        {children}
      </div>
    </div>
  );
}
