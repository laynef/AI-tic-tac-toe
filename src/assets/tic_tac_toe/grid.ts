import { GridType } from './types';


class Grid {
    public grid: GridType;
    public movesMade: number;

    constructor() {
        this.grid = [[0,0,0],[0,0,0],[0,0,0]];
        this.movesMade = 0;
    }

    public get() {
        return this.grid;
    }

    public set(x: number, y: number, value: number) {
        this.grid[y][x] = value;
        this.movesMade += 1;
    }

}

export default Grid;
