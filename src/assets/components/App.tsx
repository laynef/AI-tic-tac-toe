import * as React from 'react';
import TicTacToe from '../tic_tac_toe/game';
import { DifficultyType } from '../tic_tac_toe/types';
import GamePlay from './GamePlay';
import LandingPage from './LandingPage';
import LeaderBoard from './GameOver';


const [game, setGame]: [any | null, (state: any) => void] = React.useState(null);

const App: React.FC = () => {
  const [showLandingPage, setLandingPage] = React.useState(true);
  const [showGamePlay, setGamePlay] = React.useState(false);
  const [showLeaderboard, setLeaderboard] = React.useState(false);

  const startNewGame = (difficulty: DifficultyType): void => {
    setGame(new TicTacToe(difficulty));
    setLandingPage(false);
    setGamePlay(true);
  };

  const setGameOver = () => {};
  const playersMove = () => {};
  const playAgain = () => {};
  const gameOverMessage = '';
  const gameBoard = [[]];

  return (
    <div className="w-100 h-100">
      {showLandingPage && <LandingPage startNewGame={startNewGame} />}
      {showGamePlay && <GamePlay gameBoard={gameBoard} setGameOver={setGameOver} playersMove={playersMove} />}
      {showLeaderboard && <LeaderBoard gameOverMessage={gameOverMessage} playAgain={playAgain} />}
    </div>
  );
}

export default App;
