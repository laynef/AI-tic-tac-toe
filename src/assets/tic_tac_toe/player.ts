import Grid from './grid';
import { CoordinateType, PlayerType } from './types';


class Player {

    getBestMove(grid: Grid): CoordinateType {
		const possibilities = grid.allPossibilities();
		let bestScore = null;
		let results = possibilities[0];

		for (let i = 0; i < possibilities.length; i++) {
			const coord = possibilities[0];
			const copy_grid = new Grid(grid.grid.slice());
			const score = this.minimax(copy_grid, 9 - possibilities.length, true);

			if (bestScore === null || score > bestScore) {
				results = coord;
				bestScore = score;
			}
		}

		return results;
    }

    private minimax(grid: Grid, depth: number, isMaxPlayer: boolean): number {
		if (grid.isTerminal()) {
			return this.findScore(grid);
		}

		const player = isMaxPlayer ? PlayerType.Computer : PlayerType.Player;
		const math = (...args: any[]) => isMaxPlayer ? Math.max(...args) : Math.min(...args);
		const possibilities = grid.allPossibilities();
		let bestVal = isMaxPlayer ? -1000 : 1000;

		for (let i = 0; i < possibilities.length; i++) {
			const { x, y } = possibilities[i];
			grid.set(x, y, player);
			bestVal = math(bestVal, this.minimax(grid, depth + 1, !isMaxPlayer));
			grid.set(x, y, PlayerType.Empty);
		}

		return bestVal;      
    }

    private findScore(grid: Grid): number {
		if (grid.isWinner(PlayerType.Player)) return -10;
		else if (grid.isWinner(PlayerType.Computer)) return 10;

		return 0;
    }

}

export default Player;

