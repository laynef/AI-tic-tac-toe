import * as React from 'react';
import { GridType } from '../tic_tac_toe/types';


interface GamePlayProps {
  setGameOver: () => void;
  playersMove: () => void;
  gameBoard: GridType;
}

const GamePlay: React.FC<GamePlayProps> = () => {
  return (
    <div className="w-100 h-100">

    </div>
  );
}

export default GamePlay;
