import { PlayerType, PossibilityType, DifficultyType, CoordinateType, GridType } from './types';
import Grid from './grid';
import Rules from './rules';


class Game extends Rules {
    player: PlayerType;
    grid: Grid;
    difficulty: DifficultyType;
    isWinner: boolean;

    constructor(difficulty: DifficultyType) {
        super();
        this.player = PlayerType.Player;
        this.grid = new Grid();
        this.difficulty = difficulty;
        this.isWinner = false;
    }

    move(x?: number, y?: number) {
        if (this.isWinner || this.grid.movesMade >= 9) return this.printWinner();

        if (this.player === PlayerType.Computer) {
            const difficulty = this.difficulty === DifficultyType.Unbeatable ? this.unbeatableMove : this.beatableMove;
            let coord: CoordinateType = difficulty();
            x = coord.x; y = coord.y;
            this.grid.set(x, y, this.player);
        } else if (x && y) {
            this.grid.set(x, y, this.player);
        } else {
            return 'error';
        }

        if (this.hasWinner()) {
            this.isWinner = true;
            return this.printWinner();
        } else if (this.grid.movesMade >= 9) {
            this.isWinner = true;
            this.player = PlayerType.Tied;
            return this.printWinner();
        } else {
            this.switchPlayer();
        }
    }

    unbeatableMove(): CoordinateType {
        // Decided to not use the minimax algorithm
        // It is not performant to check every move to be unstoppable
        let comWin = this.canComputerWin();
        let blockHuman = this.canHumanWin();

        if (comWin) return comWin;
        else if (blockHuman) return blockHuman;

        return this.blockMostWinningPositions();
    }

    canWinInOneMove(player: PossibilityType): CoordinateType | void {
        let grid = this.grid.get();

        if (grid[0][0] === PossibilityType.Empty && grid[1][1] === player && grid[2][2] === player) {
            return { x: 0, y: 0 };
        } else if (grid[0][0] === player && grid[1][1] === PossibilityType.Empty && grid[2][2] === player) {
            return { x: 1, y: 1 };
        } else if (grid[0][0] === player && grid[1][1] === player && grid[2][2] === PossibilityType.Empty) {
            return { x: 0, y: 0 };
        } else if (grid[0][2] === PossibilityType.Empty && grid[1][1] === player && grid[0][2] === player) {
            return { x: 2, y: 0 };
        } else if (grid[0][2] === player && grid[1][1] === PossibilityType.Empty && grid[0][2] === player) {
            return { x: 1, y: 1 };
        } else if (grid[0][2] === player && grid[1][1] === player && grid[2][0] === PossibilityType.Empty) {
            return { x: 0, y: 2 };
        }

        for (let i = 0; i < grid.length; i++) {
            let row: PossibilityType[] = grid[i];

            if (row[0] === player && row[1] === player && row[2] === PossibilityType.Empty) {
                return { x: 2, y: i };
            } else if (row[0] === player && row[2] === player && row[1] === PossibilityType.Empty) {
                return { x: 1, y: i };
            } else if (row[2] === player && row[1] === player && row[0] === PossibilityType.Empty) {
                return { x: 0, y: i };
            } else if (grid[0][i] === player && grid[1][i] === player && grid[2][i] === PossibilityType.Empty) {
                return { x: i, y: 2 };
            } else if (grid[0][i] === player && grid[2][i] === player && grid[1][i] === PossibilityType.Empty) {
                return { x: i, y: 1 };
            } else if (grid[2][i] === player && grid[1][i] === player && grid[0][i] === PossibilityType.Empty) {
                return { x: i, y: 0 };
            }
        }
    }

    canHumanWin(): CoordinateType | void {
        return this.canWinInOneMove(PossibilityType.Player);
    }

    canComputerWin(): CoordinateType | void {
        return this.canWinInOneMove(PossibilityType.Computer);
    }

    blockMostWinningPositions(): CoordinateType {
        const possibilities = this.allPossibilities();
        const allScores = possibilities.map(coord => this.tallyWinningPossibilities(coord));
        const maxScore = Math.max(...allScores);
        
        for (let i = 0; i < allScores.length; i++) {
            if (maxScore === allScores[i]) return possibilities[i];
        }

        return possibilities[0];
    }

    tallyWinningPossibilities(coordinate: CoordinateType): number {
        let grid = this.grid.get();

        let score = 0;
        let tld = this.getLeftDiagnial(grid);
        let trd = this.getRightDiagnial(grid);
        let row = this.getRow(grid, coordinate.y);
        let col = this.getCol(grid, coordinate.x);

        if (!this.hasPlayer(row)) score += this.tallyScore(row);
        if (!this.hasPlayer(col)) score += this.tallyScore(col);
        if (this.isOnLeftDiagnial(coordinate) && !this.hasPlayer(tld)) score += this.tallyScore(tld);
        if (this.isOnRightDiagnial(coordinate) && !this.hasPlayer(trd)) score += this.tallyScore(trd);

        return score;
    }

    hasPlayer(row: number[]): boolean {
        return !!row.find(e => e === PossibilityType.Player);
    }

    getRow(grid: GridType, y: number): PossibilityType[] {
        return grid[y];
    }

    getCol(grid: GridType, x: number): PossibilityType[] {
        return [0,1,2].map(y => grid[y][x]);
    }

    getLeftDiagnial(grid: GridType): PossibilityType[] {
        return [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }].map(({ x, y }) => grid[y][x]);
    }

    isOnLeftDiagnial(coordinate: CoordinateType): boolean {
        return !![{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }].find(({ x, y }) =>  x === coordinate.x && y === coordinate.y);
    }

    isOnRightDiagnial(coordinate: CoordinateType): boolean {
        return !![{ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 }].find(({ x, y }) =>  x === coordinate.x && y === coordinate.y);
    }

    getRightDiagnial(grid: GridType): PossibilityType[] {
        return [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }].map(({ x, y }) => grid[y][x]);
    }

    tallyScore(row: PossibilityType[]): number {
        return row.reduce((acc, item) => acc + (item === PossibilityType.Computer ? 1 : 0), 1);
    }

    beatableMove(): CoordinateType {
        const possibilities = this.allPossibilities();
        const randomIndex = Math.floor(Math.random() * possibilities.length);
        return possibilities[randomIndex];
    }

}


export default Game;
