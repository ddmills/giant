import {h} from 'preact';
import PageHeader from '../partials/page-header/PageHeaderContainer';
import './basic-page.scss';

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
