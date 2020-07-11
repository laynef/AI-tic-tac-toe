import * as React from 'react';
import { DifficultyType } from '../tic_tac_toe/types';


interface LandingPageProps {
  startNewGame: (difficulty: DifficultyType) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ startNewGame }) => {
  return (
    <div className="w-100 h-100 bg-dark d-flex flex-column align-items-center justify-content-center">
      <div className="w-75 h-75 bg-light d-flex flex-column card shadow">
        <div className="w-100 d-flex flex-row justify-content-between">
          <button className="btn btn-outline-dark" onClick={() => startNewGame(DifficultyType.Beatable)}>
            Play Beatable
          </button>
          <button className="btn btn-outline-dark" onClick={() => startNewGame(DifficultyType.Unbeatable)}>
            Play Impossible
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
