import {h} from 'preact';
import PageHeader from '../partials/page-header/PageHeaderContainer';
import SuperHeader from '../partials/super-header/SuperHeaderContainer';
import PageFooter from '../partials/page-footer/PageFooterContainer';
import './basic-page.scss';

export default ({children, size}) => {
  return (
    <div class="page page--full">
      <SuperHeader/>
      <div class='container container--full play-area'>
        {children}
      </div>
    </div>
  );
}
