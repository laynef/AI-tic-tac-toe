import * as React from 'react';
import Game from '../tic_tac_toe/game';
import { DifficultyType, PlayerType } from '../tic_tac_toe/types';
import GamePlay from './GamePlay';
import LandingPage from './LandingPage';
import GameOver from './GameOver';


const Application: React.FC = () => {
  const [game, setGame]: [any, (state: any) => void] = React.useState(null);
  const [gameboard, setGameBoard]: [any, (state: any) => void] = React.useState(null);
  const [playersTurn, setPlayersTurn] = React.useState(0);
  const [showLandingPage, setLandingPage] = React.useState(true);
  const [showGamePlay, setGamePlay] = React.useState(false);
  const [showLeaderboard, setLeaderBoard] = React.useState(false);
  const [gameOverMessage, setGameOverMessage] = React.useState(null);

  const startNewGame = (difficulty: DifficultyType): void => {
    const ticTacToe = new Game(difficulty);
    setGame(ticTacToe);
    setLandingPage(false);
    setGamePlay(true);
    setGameBoard(ticTacToe.grid.grid.slice());
  };

  const setGameOver = (): void => {
    setGamePlay(false);
    setLeaderBoard(true);
  };

  const makeTurn = (x?: number, y?: number): void => {
    if (game && !game.isWinner) {
      game.move(x, y);
      setGameBoard(game.grid.grid.slice());
    } else {
      return;
    }

    if (game && game.isWinner) {
      setGameOverMessage(game.printWinner());
      setGameOver();
    }
  }

  const playersMove = (x: number, y: number): void => {
    if (game.player === PlayerType.Player) {
      makeTurn(x, y);
      setPlayersTurn(playersTurn + 1);
    }
  };

  const playAgain = (): void => {
    setLeaderBoard(false);
    setGameOverMessage(null);
    setLandingPage(true);
  };

  React.useEffect(() => {
    setTimeout(() => {
      makeTurn();
    }, 300);
  }, [playersTurn]);

  return (
    <div className="w-100 h-100">
      {showLandingPage && <LandingPage startNewGame={startNewGame} />}
      {showGamePlay && <GamePlay gameBoard={gameboard} playersMove={playersMove} />}
      {showLeaderboard && <GameOver gameOverMessage={gameOverMessage} playAgain={playAgain} />}
    </div>
  );
}

export default Application;
