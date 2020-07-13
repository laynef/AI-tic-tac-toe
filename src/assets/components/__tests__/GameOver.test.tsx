import React from 'react';
import ReactDOM from 'react-dom';

import GameOver from '../GameOver';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameOver playAgain={() => {}} gameOverMessage={null} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
