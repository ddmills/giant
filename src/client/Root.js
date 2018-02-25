import {h, Component} from 'preact';
import {Provider} from 'preact-redux';
import Store from './store/Store';
import Router from './Router';
import {listen} from './network/Client';
import Socket from './network/Socket';

listen(Socket);

export default (props) => {
  return (
    <Provider store={Store}>
      <Router/>
    </Provider>
  );
}
