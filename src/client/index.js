import {h, render} from 'preact';
import Root from './Root';

const app = document.getElementById('app');

render(<Root/>, app, app.lastChild);
