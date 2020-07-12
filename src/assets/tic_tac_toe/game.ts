import { PlayerType, DifficultyType, CoordinateType } from './types';
import Grid from './grid';
import Player from './player';


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
        console.log('First: ', this.grid)

        if (this.grid.isTerminal()) return;

        console.log('Second: ', this.grid)

        if (this.player === PlayerType.Computer) {
            let coord;
            if (this.difficulty === DifficultyType.Unbeatable) coord = this.unbeatableMove();
            else coord = this.beatableMove();
            x = coord.x; y = coord.y;
        }

        console.log('Third: ', this.grid)

        if (typeof x === 'number' && typeof y === 'number') {
            this.grid.set(x, y, this.player);
        }

        console.log('Fourth: ', this.grid)

        if (this.grid.isWinner(this.player)) {
            this.isWinner = true;
        } else if (this.grid.movesMade >= 9) {
            this.isWinner = true;
            this.player = PlayerType.Empty;
        } else if (typeof x === 'number' && typeof y === 'number') {
            this.switchPlayer();
        }

        console.log('Final: ', this.grid)
    }

    printWinner(): string {
        return this.getWinner();
    }

    private unbeatableMove(): CoordinateType {
        const p = new Player(this.grid);
        return p.getBestMove();
    }

    private beatableMove(): CoordinateType {
        return this.grid.getRandomMove();
    }

    private getWinner(): string {
        if (!this.isWinner) return 'Game still in session';

        if (this.player === PlayerType.Player) return 'You win!'
        else if (this.player === PlayerType.Computer) return 'Computer wins!'
        else if (this.player === PlayerType.Empty) return 'Tie!'

        return 'error';
    }

    private switchPlayer(): void {
        if (this.player === PlayerType.Computer) {
            this.player = PlayerType.Player;
        } else {
            this.player = PlayerType.Computer;
        }
    }

}


export default Game;
