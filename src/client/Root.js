import {h} from 'preact';
import {Provider} from 'preact-redux';
import Store from './store/Store';
import App from './App';

export default (props) => {
  return (
    <Provider store={Store}>
      <App/>
    </Provider>
  );
}
