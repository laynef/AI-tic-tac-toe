import * as React from 'react';
import { DifficultyType } from '../tic_tac_toe/types';


interface LandingPageProps {
  startNewGame: (difficulty: DifficultyType) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ startNewGame }) => {
  return (
    <div className="w-100 h-100">

    </div>
  );
}

export default LandingPage;
