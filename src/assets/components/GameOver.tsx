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
    <div className="w-100 h-100 bg-dark d-flex flex-column align-items-center justify-content-center">
      <div className="w-75 h-75 bg-light d-flex flex-column card shadow">

      </div>
    </div>
  );
}

export default GameOver;
