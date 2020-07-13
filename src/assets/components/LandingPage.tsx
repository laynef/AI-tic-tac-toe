import * as React from 'react';
import { DifficultyType } from '../tic_tac_toe/types';
import logo from '../images/logo.svg';


interface LandingPageProps {
  startNewGame: (difficulty: DifficultyType) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ startNewGame }) => {
  return (
    <div id="LandingPage" className="w-100 h-100 bg-dark d-flex flex-column align-items-center justify-content-center">
      <div className="w-75 h-75 bg-light d-flex flex-column card align-items-center justify-content-between shadow">
        <h1 className="text-center font-weight-light mt-5 mb-5">Tic Tac Toe</h1>
        <img className="App-logo" src={logo} alt="" />
        <div className="w-100 d-flex flex-row mt-5 mb-5 justify-content-around">
          <button className="btn btn-outline-primary" onClick={() => startNewGame(DifficultyType.Beatable)}>
            Play Beatable
          </button>
          <button className="btn btn-outline-danger" onClick={() => startNewGame(DifficultyType.Unbeatable)}>
            Play Impossible
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
