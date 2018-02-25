import {h, Component} from 'preact';
import {Provider} from 'preact-redux';
import Store from './store/Store';
import Router from './Router';
import './network/Client';

export default (props) => {
  return (
    <Provider store={Store}>
      <Router/>
    </Provider>
  );
}
