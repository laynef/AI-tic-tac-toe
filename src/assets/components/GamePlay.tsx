import * as React from 'react';
import { GridType, PlayerType } from '../tic_tac_toe/types';


interface GamePlayProps {
  playersMove: (x: number, y: number) => void;
  gameBoard: GridType | null;
}

const renderPiece = (player: PlayerType): React.ReactNode | null => {
  if (player === PlayerType.Player) return <h1 className="text-center">X</h1>;
  else if (player === PlayerType.Computer) return <h1 className="text-center">O</h1>;

  return null;
}

const GamePlay: React.FC<GamePlayProps> = ({
  playersMove,
  gameBoard,
}) => {
  return (
    <div className="w-100 h-100 bg-dark d-flex flex-column align-items-center justify-content-center">
      <div className="w-75 h-75 bg-light d-flex flex-column card shadow">
        <table>
          <tbody>
            {Array.isArray(gameBoard) && gameBoard.map((row, y) => (
              <tr key={y}>
                {Array.isArray(row) && row.map((data, x) => (
                  <td className="" onClick={() => data === PlayerType.Empty && playersMove(x, y)} key={`${y}-${x}`}>
                    {renderPiece(data)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GamePlay;
