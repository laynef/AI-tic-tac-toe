import { DifficultyType } from '../types';
import Game from '../game';


describe('Game', () => {

    describe('Beatable Difficulty', () => {

        it('call without errors', () => {
            const beatable = new Game(DifficultyType.Beatable);
            expect(beatable).toBeInstanceOf(Game);
        });

    })

    describe('Unbeatable Difficulty', () => {

        it('call without errors', () => {
            const unbeatable = new Game(DifficultyType.Unbeatable);
            expect(unbeatable).toBeInstanceOf(Game);
        });

    })

});
