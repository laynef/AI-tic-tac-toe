import React from 'react';
import ReactDOM from 'react-dom';
import GamePlay from '../GamePlay';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GamePlay playersMove={() => {}} gameBoard={null} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
