import {h} from 'preact';
import PageHeader from '../partials/page-header/PageHeaderContainer';
import SuperHeader from '../partials/super-header/SuperHeaderContainer';
import PageFooter from '../partials/page-footer/PageFooterContainer';
import './basic-page.scss';

export default ({children, size}) => {
  const className = `page-content container ${size ? `container--${size}` : ''}`;

  return (
    <div class="page">
      <SuperHeader/>
      <PageHeader/>
      <div class={className}>
        {children}
      </div>
      <PageFooter/>
    </div>
  );
}
