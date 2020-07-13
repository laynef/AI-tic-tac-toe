import React from 'react';
import ReactDOM from 'react-dom';

import '../assets/styles/index.scss';
import App from '../assets/components/Application';

ReactDOM.hydrate(<App />, document.getElementById('root'));
