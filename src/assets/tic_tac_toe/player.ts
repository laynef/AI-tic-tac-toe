import Grid from './grid';
import { CoordinateType, PlayerType } from './types';


class Player {

    getBestMove(grid: Grid): CoordinateType {
		const possibilities = grid.allPossibilities();

		const scores = possibilities.map(({ x, y }) => {
			const newGame = new Grid(grid.grid.slice());
			newGame.set(x, y, PlayerType.Computer);
			return this.minimax(newGame, false);
		});

		const { index } = scores.reduce((acc, score, i) => {
			if (acc.score < score) {
				acc.score = score;
				acc.index = i;
			}

			return acc;
		}, { index: 0, score: -Infinity });

		return possibilities[index];
    }

    private minimax(board: Grid, isCom: boolean): number {
		if (board.isTerminal()) {
			return this.findScore(board);
		}

		const player = isCom ? PlayerType.Computer : PlayerType.Player;
		const possibilities = board.allPossibilities();
		let bestVal = isCom ? -1000 : 1000;

		possibilities.forEach(({ x, y }) => {
			const newGame = new Grid(board.grid.slice());
			newGame.set(x, y, player);
			bestVal = this.minimax(newGame, !isCom);
		});

		return bestVal;      
    }

    private findScore(grid: Grid): number {
		if (grid.isWinner(PlayerType.Player)) return -10;
		else if (grid.isWinner(PlayerType.Computer)) return 10;

		return 0;
    }

}

export default Player;

