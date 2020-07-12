import Grid from './grid';
import { CoordinateType, PlayerType } from './types';


class Player {

    maxDepth?: number;
    nodesMap: any;

	constructor(maxDepth = -1) {
        this.maxDepth = maxDepth;
        this.nodesMap = new Map();
    }

    getBestMove(grid: Grid): CoordinateType {
	const possibilities = grid.getPossibilities();

	return possibilities.reduce((acc, coord) => {
	    const copy_grid = new Grid(grid.grid.slice());
	    const score = this.minimax(copy_grid, 9 - possibilities.length, true);

	    if (acc.score === null || score > acc.score) {
	        acc.coordinate = coord;
                acc.score = score;
	    }
	    
	    return acc;
	}, { score: null, coordinate: { x: 0, y: 0 } }).coordinate;
    }

    private minimax(grid: Grid, depth: number, isMaxPlayer: boolean): CoordinateType {
	if (grid.isTerminal()) {
	    return findScore(grid);
	}

	let bestVal;
	let possibilities = grid.getPossibilities();

	if (isMaxPlayer) {
	   bestVal = -1000;
	   
	   for (let i = 0; i < possibilities.length; i++) {
	        let coord = possibilities[i];
		grid.set(coord.x, coord.y, PlayerType.Computer);
	        bestVal = Math.max(bestVal, this.minimax(board, depth+1, !isMaxPlayer));
		grid.set(coord.x, coord.y, PlayerType.Empty);
	   }
	} else {
	   bestVal = 1000;

           for (let i = 0; i < possibilities.length; i++) {
                let coord = possibilities[i];
                grid.set(coord.x, coord.y, PlayerType.Computer);
                bestVal = Math.min(bestVal, this.minimax(board, depth+1, !isMaxPlayer));
		grid.set(coord.x, coord.y, PlayerType.Empty);
           }
	}  

	return bestVal;      
    }

    private findScore(grid: Grid) {
	if (grid.isWinner(PlayerType.Player)) return -10;
	else if (grid.isWinner(PlayerType.Computer)) return 10;

	return 0;
    }

}

export default Player;

