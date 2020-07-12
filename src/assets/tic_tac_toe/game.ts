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
        if (this.grid.isTerminal()) return;

        if (this.player === PlayerType.Computer) {
            const difficulty = this.difficulty === DifficultyType.Unbeatable ? () => this.unbeatableMove() : () => this.beatableMove();
            let coord: CoordinateType = difficulty();
            x = coord.x; y = coord.y;
        }

        if (typeof x === 'number' && typeof y === 'number') {
            this.grid.set(x, y, this.player);
        }

        if (this.grid.isWinner(this.player)) {
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
        const p = new Player();
        console.log('HIT', this.grid.grid)
        return p.getBestMove(new Grid(this.grid.grid.slice()));
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
