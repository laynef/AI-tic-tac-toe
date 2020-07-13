import React from 'react';
import ReactDOM from 'react-dom';

import '../assets/styles/index.scss';
import App from '../assets/components/Application';
import * as serviceWorker from './serviceWorker';


ReactDOM.hydrate(<App />, document.getElementById('root'));
serviceWorker.register();