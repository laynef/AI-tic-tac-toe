import * as React from 'react';
import { GridType } from '../tic_tac_toe/types';


interface GamePlayProps {
  setGameOver: () => void;
  playersMove: (x: number, y: number) => void;
  gameBoard: GridType | null;
}

const GamePlay: React.FC<GamePlayProps> = ({
  setGameOver,
  playersMove,
  gameBoard,
}) => {
  return (
    <div className="w-100 h-100 bg-dark d-flex flex-column align-items-center justify-content-center">
      <div className="w-75 h-75 bg-light d-flex flex-column card shadow">

      </div>
    </div>
  );
}

export default GamePlay;
