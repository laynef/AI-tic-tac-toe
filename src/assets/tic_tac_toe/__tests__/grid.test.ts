import { PlayerType } from '../types';
import Grid from '../grid';;


const emptyGrid = [
    [PlayerType.Empty,PlayerType.Empty,PlayerType.Empty],
    [PlayerType.Empty,PlayerType.Empty,PlayerType.Empty],
    [PlayerType.Empty,PlayerType.Empty,PlayerType.Empty]
];

describe('Grid', () => {

    it('call without errors', () => {
        const initialize = new Grid();
        const reinitialize = new Grid(emptyGrid);

        expect(initialize).toBeInstanceOf(Grid);
        expect(reinitialize).toBeInstanceOf(Grid);
        expect(initialize.grid).toEqual(emptyGrid);
        expect(reinitialize.grid).toEqual(emptyGrid);
    });

    describe('call methods', () => {
        const initialize = new Grid();
        const allPositions = initialize.allPossibilities();

        it('Make random moves, set values, and check valid number available spaces', () => {
            for (let i = 0; i < 9; i++) {
                let { x, y } = initialize.getRandomMove();
                expect(initialize.grid[y][x]).toEqual(PlayerType.Empty);

                initialize.set(x, y, PlayerType.Player);
                expect(initialize.grid[y][x]).toEqual(PlayerType.Player);

                const movesLeft = initialize.allPossibilities();
                expect(movesLeft.length).toEqual(9 - i - 1);
            }
        });

        it('Check winner and terminal methods', () => {
            expect(initialize.isTerminal()).toEqual(true);
            expect(initialize.isWinner(PlayerType.Player)).toEqual(true);
        });

        it('Clear moves and check valid number available spaces', () => {
            allPositions.forEach(({ x, y }, i) => {
                initialize.clear(x, y);
                expect(initialize.grid[y][x]).toEqual(PlayerType.Empty);

                const movesLeft = initialize.allPossibilities();
                expect(movesLeft.length).toEqual(i + 1);
            });
        });

    });

});