import * as React from 'react';
import { PlayerType } from '../tic_tac_toe/types';
import win from '../images/trophy.png';
import lose from '../images/robot.png';
import tie from '../images/tie.png';

interface GameOverProps {
  playAgain: () => void;
  gameOverMessage: string | null;
  winner: PlayerType | null;
}

const renderImage = (player: PlayerType) => {
  let src;
  if (player === PlayerType.Player) src = win;
  else if (player === PlayerType.Computer) src = lose;
  else if (player === PlayerType.Empty) src = tie;
  return <img src={src} alt="" />;
};

const GameOver: React.FC<GameOverProps> = ({
  playAgain,
  gameOverMessage,
  winner,
}) => {
  return (
    <div
      id="GameOver"
      className="w-100 h-100 bg-light d-flex flex-column align-items-center justify-content-center h-fit-content"
    >
      <div className="w-75 h-75 bg-white d-flex flex-column card align-items-center round-card justify-content-between shadow h-fit-content">
        <h1
          style={{ fontSize: '3.5rem' }}
          className="text-muted text-center font-weight-light mt-5 mb-5"
        >
          Game Over
        </h1>
        {gameOverMessage && (
          <h2 className="text-muted text-center font-weight-light mt-1 mb-1">
            {gameOverMessage}
          </h2>
        )}
        {winner !== null && renderImage(winner)}
        <div className="w-100 d-flex flex-column flex-lg-row justify-content-around mt-5 mb-5">
          <button
            className="btn btn-outline-secondary"
            onClick={() => playAgain()}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
