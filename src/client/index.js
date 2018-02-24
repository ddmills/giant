import {h, render} from 'preact';
import RootComponent from './RootComponent';

const app = document.getElementById('app');

render(<RootComponent/>, app, app.lastChild);
