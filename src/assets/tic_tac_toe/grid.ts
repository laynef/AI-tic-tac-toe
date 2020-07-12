import { GridType, PlayerType } from './types';


class Grid {
    public grid: GridType;
    public movesMade: number;

    constructor() {
        this.grid = [
            [PlayerType.Empty,PlayerType.Empty,PlayerType.Empty],
            [PlayerType.Empty,PlayerType.Empty,PlayerType.Empty],
            [PlayerType.Empty,PlayerType.Empty,PlayerType.Empty]
        ];
        this.movesMade = 0;
    }

    public set(x: number, y: number, value: number) {
        this.grid[y][x] = value;
        this.movesMade += 1;
    }

}

export default Grid;
