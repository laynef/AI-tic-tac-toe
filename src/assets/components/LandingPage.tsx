import * as React from 'react';
import { DifficultyType } from '../tic_tac_toe/types';
import logo from '../images/home.svg';

interface LandingPageProps {
  startNewGame: (difficulty: DifficultyType) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ startNewGame }) => {
  return (
    <div
      id="LandingPage"
      className="w-100 h-100 bg-light d-flex flex-column align-items-center justify-content-center"
    >
      <div className="w-75 h-75 bg-white d-flex flex-column card align-items-center round-card justify-content-between shadow">
        <h1
          style={{ fontSize: '3.5rem' }}
          className="text-center text-muted font-weight-light mt-5 mb-5"
        >
          Tic Tac Toe
        </h1>
        <img src={logo} alt="" />
        <div className="w-100 d-flex flex-row mt-5 mb-5 justify-content-around">
          <button
            className="btn btn-outline-secondary"
            onClick={() => startNewGame(DifficultyType.Beatable)}
          >
            Play Beatable
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => startNewGame(DifficultyType.Unbeatable)}
          >
            Play Impossible
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
