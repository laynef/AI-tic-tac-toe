import * as React from 'react';


interface GameOverProps {
    playAgain: () => void;
    gameOverMessage: string;
}

const GameOver: React.FC<GameOverProps> = () => {
  return (
    <div className="w-100 h-100">

    </div>
  );
}

export default GameOver;
