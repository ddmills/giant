import {h} from 'preact';
import PageHeader from '../partials/page-header/PageHeaderContainer';

export default ({children}) => {
  return (
    <div class="basic-page">
      <PageHeader/>
      <div class="container">
        {children}
      </div>
    </div>
  );
}
