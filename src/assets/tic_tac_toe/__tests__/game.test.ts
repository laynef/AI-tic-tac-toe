import { DifficultyType, PlayerType } from '../types';
import Game from '../game';


describe('Game', () => {

    describe('Beatable Difficulty', () => {
        const beatable = new Game(DifficultyType.Beatable);

        it('call without errors', () => {
            expect(beatable).toBeInstanceOf(Game);
        });

        it('Human can move', () => {
            beatable.move(0, 0);
            expect(beatable.grid.grid[0][0]).toEqual(PlayerType.Player);
        });

        it('Computer can move', () => {
            beatable.move();
            expect(beatable.grid.movesMade).toEqual(2);
        });

    });

    describe('Unbeatable Difficulty', () => {

        const unbeatable = new Game(DifficultyType.Unbeatable);
        it('call without errors', () => {
            expect(unbeatable).toBeInstanceOf(Game);
        });

        it('Human can move', () => {
            unbeatable.move(0, 0);
            expect(unbeatable.grid.grid[0][0]).toEqual(PlayerType.Player);
        });

        it('Computer can move', () => {
            unbeatable.move();
            expect(unbeatable.grid.movesMade).toEqual(2);
        });

    });

});
