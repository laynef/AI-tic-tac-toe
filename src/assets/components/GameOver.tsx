import * as React from 'react';


interface GameOverProps {
  playAgain: () => void;
  gameOverMessage: string | null;
}

const GameOver: React.FC<GameOverProps> = ({
  playAgain,
  gameOverMessage,
}) => {
  return (
    <div id="GameOver" className="w-100 h-100 bg-dark d-flex flex-column align-items-center justify-content-center">
      <div className="w-75 h-75 bg-light d-flex flex-column card align-items-center justify-content-between shadow">
        <h1 className="text-center font-weight-light mt-5 mb-5">Game Over</h1>
        {gameOverMessage && <h2 className="text-center font-weight-light mt-5 mb-5">{gameOverMessage}</h2>}
        <div className="w-100 d-flex flex-row justify-content-around mt-5 mb-5">
          <button className="btn btn-outline-primary" onClick={() => playAgain()}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOver;
