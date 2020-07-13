import * as React from 'react';
import Game from '../tic_tac_toe/game';
import {
  DifficultyType,
  PlayerType,
  CoordinateType,
} from '../tic_tac_toe/types';
import GamePlay from './GamePlay';
import LandingPage from './LandingPage';
import GameOver from './GameOver';

const Application: React.FC = () => {
  const [game, setGame]: [any, (state: any) => void] = React.useState(null);
  const [winner, setWinner]: [any, (state: any) => void] = React.useState(null);
  const [gameboard, setGameBoard]: [any, (state: any) => void] = React.useState(
    null
  );
  const [playersTurn, setPlayersTurn] = React.useState(0);
  const [showLandingPage, setLandingPage] = React.useState(true);
  const [showGamePlay, setGamePlay] = React.useState(false);
  const [showGameOver, setGameOverPage] = React.useState(false);
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
    setGameOverPage(true);
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
      setWinner(game.player);

      const winArr = game.grid.getWinningArray(game.player);
      const winLen = winArr.length;

      winArr.forEach((e: CoordinateType) => {
        const div = document.createElement('div');
        div.className = 'foo';

        const id = document.getElementById(`${e.y}-${e.x}`) || div;
        const winClass =
          winLen !== 3
            ? 'text-tie'
            : game.player === PlayerType.Player
            ? 'text-win'
            : 'text-lose';
        id.classList.add(winClass);
      });

      const time = winLen === 3 ? 1000 : 300;
      setTimeout(() => {
        setGameOver();
      }, time);
    }
  };

  const playersMove = (x: number, y: number): void => {
    if (game.player === PlayerType.Player) {
      makeTurn(x, y);
      setPlayersTurn(playersTurn + 1);
    }
  };

  const playAgain = (): void => {
    setGameOverPage(false);
    setGameOverMessage(null);
    setLandingPage(true);
  };

  React.useEffect(() => {
    setTimeout(() => {
      makeTurn();
    }, 300);
  }, [playersTurn]);

  return (
    <div
      id="Application"
      className={`${
        showGamePlay || (showGameOver && gameOverMessage === 'Tie!')
          ? 'root'
          : 'app'
      }`}
    >
      {showLandingPage && <LandingPage startNewGame={startNewGame} />}
      {showGamePlay && (
        <GamePlay gameBoard={gameboard} playersMove={playersMove} />
      )}
      {showGameOver && (
        <GameOver
          winner={winner}
          gameOverMessage={gameOverMessage}
          playAgain={playAgain}
        />
      )}
    </div>
  );
};

export default Application;
