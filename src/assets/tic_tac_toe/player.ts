import Grid from './grid';
import { CoordinateType, PlayerType } from './types';


class Player {

	grid: Grid;

	constructor(grid: Grid) {
		this.grid = grid;
	}

    getBestMove(): CoordinateType {
		const possibilities = this.grid.allPossibilities();

		return possibilities.reduce((acc, { x, y }) => {
			this.grid.set(x, y, PlayerType.Computer);
			const score = this.minimax(this.grid, false);
			this.grid.clear(x, y);

			if (score > acc.score) {
				acc.coordinate = { x, y };
				acc.score = score;
			}

			return acc;
		}, { score: -Infinity, coordinate: { x: 0, y: 0 } }).coordinate;
    }

    private minimax(board: Grid, isCom: boolean): number {
		if (board.isTerminal()) {
			return this.findScore(board);
		}

		const player = isCom ? PlayerType.Computer : PlayerType.Player;
		const possibilities = board.allPossibilities();
		let bestVal = isCom ? -Infinity : Infinity;

		for (let i = 0; i < possibilities.length; i++) {
			const { x, y } = possibilities[i];

			board.set(x, y, player);
			const score = this.minimax(board, !isCom);
			board.clear(x, y);

			bestVal = isCom ? Math.max(score, bestVal) : Math.min(score, bestVal);
		}

		return bestVal;      
    }

    private findScore(board: Grid): number {
		if (board.isWinner(PlayerType.Player)) return -10;
		else if (board.isWinner(PlayerType.Computer)) return 10;

		return 0;
    }

}

export default Player;

