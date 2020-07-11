import { PlayerType, PossibilityType } from './types';
import Grid from './grid';


class Rules {
    player: PlayerType;
    grid: Grid;
    isWinner: boolean;

    constructor() {
        this.player = PlayerType.Player;
        this.grid = new Grid();
        this.isWinner = false;
    }

    printWinner(): string {
        if (!this.isWinner) return 'Game still in session';

        if (this.player === PlayerType.Player) return 'You win!'
        else if (this.player === PlayerType.Computer) return 'Computer wins!'
        else if (this.player === PlayerType.Tied) return 'Tie!'

        return 'error';
    }

    hasWinner(): boolean {
        let grid = this.grid.get();
        if (this.checkDiagonials(grid)) return true;

        for (let i = 0; i < 3; i++) {
            if (this.checkRow(grid[i])) return true;
            else if (this.checkColumn(grid, i)) return true;
        }

        return false;
    }

    checkRow(row: number[]): boolean {
        return row[0] === this.player &&
            row[1] === this.player &&
            row[2] === this.player;
    }

    checkColumn(grid: number[][], index: number): boolean {
        return grid[0][index] === this.player &&
            grid[1][index] === this.player &&
            grid[2][index] === this.player;
    }

    checkDiagonials(grid: number[][]): boolean {
        return (
            grid[0][0] === this.player &&
            grid[1][1] === this.player &&
            grid[2][2] === this.player
        ) || (
            grid[0][2] === this.player &&
            grid[1][1] === this.player &&
            grid[2][0] === this.player
        );
    }

    switchPlayer(): void {
        if (this.player === PlayerType.Computer) {
            this.player = PlayerType.Player;
        } else {
            this.player = PlayerType.Computer;
        }
    }

    allPositions() {
        return [
            { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
            { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
            { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
        ]
    }

    allPossibilities() {
        const grid = this.grid.get();
        const positions = this.allPositions();
        return positions.filter(({ x, y }) => grid[y][x] === PossibilityType.Empty);
    }

}

export default Rules;
