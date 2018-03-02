import {h} from 'preact';
import PageHeader from '../partials/page-header/PageHeaderContainer';
import './basic-page.scss';

export default ({children, size}) => {
  const className = `container ${size ? `container--${size}` : ''}`;

  return (
    <div class="basic-page">
      <PageHeader/>
      <div class={className}>
        {children}
      </div>
    </div>
  );
}
