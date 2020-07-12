import { PlayerType, DifficultyType, CoordinateType, GridType } from './types';
import Grid from './grid';


class Game {
    public player: PlayerType;
    public grid: Grid;
    public difficulty: DifficultyType;
    public isWinner: boolean;

    constructor(difficulty: DifficultyType) {
        this.player = PlayerType.Player;
        this.grid = new Grid();
        this.difficulty = difficulty;
        this.isWinner = false;
    }

    move(x?: number, y?: number) {
        console.log(this.grid.grid)
        if (this.isWinner || this.grid.movesMade >= 9) return;

        if (this.player === PlayerType.Computer) {
            const difficulty = this.difficulty === DifficultyType.Unbeatable ? () => this.unbeatableMove() : () => this.beatableMove();
            let coord: CoordinateType = difficulty();
            x = coord.x; y = coord.y;
        }

        if (typeof x === 'number' && typeof y === 'number') {
            this.grid.grid[y][x] = this.player;
            this.grid.movesMade += 1;
        }

        if (this.hasWinner()) {
            this.isWinner = true;
        } else if (this.grid.movesMade >= 9) {
            this.isWinner = true;
            this.player = PlayerType.Empty;
        } else if (typeof x === 'number' && typeof y === 'number') {
            this.switchPlayer();
        }
    }

    printWinner(): string {
        return this.getWinner();
    }

    private unbeatableMove(): CoordinateType {
        // Decided to not use the minimax algorithm
        // It is not performant to check every move to be unstoppable
        let comWin = this.canComputerWin();
        let blockHuman = this.canHumanWin();

        if (comWin) return comWin;
        else if (blockHuman) return blockHuman;

        return this.blockMostWinningPositions();
    }

    private canWinInOneMove(player: PlayerType): CoordinateType | void {
        let grid = this.grid.grid;

        if (grid[0][0] === PlayerType.Empty && grid[1][1] === player && grid[2][2] === player) {
            return { x: 0, y: 0 };
        } else if (grid[0][0] === player && grid[1][1] === PlayerType.Empty && grid[2][2] === player) {
            return { x: 1, y: 1 };
        } else if (grid[0][0] === player && grid[1][1] === player && grid[2][2] === PlayerType.Empty) {
            return { x: 0, y: 0 };
        } else if (grid[0][2] === PlayerType.Empty && grid[1][1] === player && grid[0][2] === player) {
            return { x: 2, y: 0 };
        } else if (grid[0][2] === player && grid[1][1] === PlayerType.Empty && grid[0][2] === player) {
            return { x: 1, y: 1 };
        } else if (grid[0][2] === player && grid[1][1] === player && grid[2][0] === PlayerType.Empty) {
            return { x: 0, y: 2 };
        }

        for (let i = 0; i < grid.length; i++) {
            let row: PlayerType[] = grid[i];

            if (row[0] === player && row[1] === player && row[2] === PlayerType.Empty) {
                return { x: 2, y: i };
            } else if (row[0] === player && row[2] === player && row[1] === PlayerType.Empty) {
                return { x: 1, y: i };
            } else if (row[2] === player && row[1] === player && row[0] === PlayerType.Empty) {
                return { x: 0, y: i };
            } else if (grid[0][i] === player && grid[1][i] === player && grid[2][i] === PlayerType.Empty) {
                return { x: i, y: 2 };
            } else if (grid[0][i] === player && grid[2][i] === player && grid[1][i] === PlayerType.Empty) {
                return { x: i, y: 1 };
            } else if (grid[2][i] === player && grid[1][i] === player && grid[0][i] === PlayerType.Empty) {
                return { x: i, y: 0 };
            }
        }
    }

    private canHumanWin(): CoordinateType | void {
        return this.canWinInOneMove(PlayerType.Player);
    }

    private canComputerWin(): CoordinateType | void {
        return this.canWinInOneMove(PlayerType.Computer);
    }

    private blockMostWinningPositions(): CoordinateType {
        const possibilities = this.allPossibilities();
        const allScores = possibilities.map(coord => this.tallyWinningPossibilities(coord));
        const maxScore = Math.max(...allScores);

        const bestScorePositions: CoordinateType[] = allScores.reduce((arr: CoordinateType[], score, i) => {
            if (maxScore === score) arr.push(possibilities[i]);
            return arr;
        }, []);

        if (bestScorePositions.length > 1) {
            return bestScorePositions.find(({ x, y }) => x === 1 || y === 1) || bestScorePositions[0];
        } else {
            return bestScorePositions[0];
        }
    }

    private tallyWinningPossibilities(coordinate: CoordinateType): number {
        let score = 0;
        let tld = this.getLeftDiagnial();
        let trd = this.getRightDiagnial();
        let row = this.getRow(coordinate.y);
        let col = this.getCol(coordinate.x);

        if (!this.hasPlayer(row)) score += this.tallyScore(row);
        if (!this.hasPlayer(col)) score += this.tallyScore(col);
        if (this.isOnLeftDiagnial(coordinate) && !this.hasPlayer(tld)) score += this.tallyScore(tld);
        if (this.isOnRightDiagnial(coordinate) && !this.hasPlayer(trd)) score += this.tallyScore(trd);

        return score;
    }

    private hasPlayer(row: PlayerType[]): boolean {
        return !!row.find(e => e === PlayerType.Player);
    }

    private getRow(y: number): PlayerType[] {
        return this.grid.grid[y];
    }

    private getCol(x: number): PlayerType[] {
        return [0,1,2].map(y => this.grid.grid[y][x]);
    }

    private getLeftDiagnial(): PlayerType[] {
        return [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }].map(({ x, y }) => this.grid.grid[y][x]);
    }

    private isOnLeftDiagnial(coordinate: CoordinateType): boolean {
        return !![{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }].find(({ x, y }) =>  x === coordinate.x && y === coordinate.y);
    }

    private isOnRightDiagnial(coordinate: CoordinateType): boolean {
        return !![{ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 }].find(({ x, y }) =>  x === coordinate.x && y === coordinate.y);
    }

    private getRightDiagnial(): PlayerType[] {
        return [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }].map(({ x, y }) => this.grid.grid[y][x]);
    }

    private tallyScore(row: PlayerType[]): number {
        return row.reduce((acc, item) => acc + (item === PlayerType.Computer ? 1 : 0), 1);
    }

    private beatableMove(): CoordinateType {
        const possibilities = this.allPossibilities();
        const randomIndex = Math.floor(Math.random() * possibilities.length);
        return possibilities[randomIndex];
    }

    private getWinner(): string {
        if (!this.isWinner) return 'Game still in session';

        if (this.player === PlayerType.Player) return 'You win!'
        else if (this.player === PlayerType.Computer) return 'Computer wins!'
        else if (this.player === PlayerType.Empty) return 'Tie!'

        return 'error';
    }

    private hasWinner(): boolean {
        let grid = this.grid.grid;
        if (this.checkDiagonials()) return true;

        for (let i = 0; i < 3; i++) {
            if (this.checkRow(grid[i])) return true;
            else if (this.checkColumn(i)) return true;
        }

        return false;
    }

    private checkRow(row: PlayerType[]): boolean {
        return row[0] === this.player &&
            row[1] === this.player &&
            row[2] === this.player;
    }

    private checkColumn(index: number): boolean {
        return this.grid.grid[0][index] === this.player &&
            this.grid.grid[1][index] === this.player &&
            this.grid.grid[2][index] === this.player;
    }

    private checkDiagonials(): boolean {
        return (
            this.grid.grid[0][0] === this.player &&
            this.grid.grid[1][1] === this.player &&
            this.grid.grid[2][2] === this.player
        ) || (
            this.grid.grid[0][2] === this.player &&
            this.grid.grid[1][1] === this.player &&
            this.grid.grid[2][0] === this.player
        );
    }

    private switchPlayer(): void {
        if (this.player === PlayerType.Computer) {
            this.player = PlayerType.Player;
        } else {
            this.player = PlayerType.Computer;
        }
    }

    private allPositions(): CoordinateType[] {
        return [
            { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
            { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
            { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
        ]
    }

    private allPossibilities(): CoordinateType[] {
        const positions = this.allPositions();
        return positions.filter(({ x, y }) => this.grid.grid[y][x] === PlayerType.Empty);
    }

}


export default Game;
