import { GridType } from './types';


class Grid {
    grid: GridType;
    movesMade: number;

    constructor() {
        this.grid = [[0,0,0],[0,0,0],[0,0,0]];
        this.movesMade = 0;
    }

    get() {
        return this.grid;
    }

    set(x: number, y: number, value: number) {
        this.grid[y][x] = value;
        this.movesMade += 1;
    }

}

export default Grid;
