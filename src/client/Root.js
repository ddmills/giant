import {h, Component} from 'preact';
import {Provider} from 'preact-redux';
import {store} from './store/StoreFactory';
import Router from './Router';

export default (props) => {
  return (
    <Provider store={store}>
      <Router/>
    </Provider>
  );
}
