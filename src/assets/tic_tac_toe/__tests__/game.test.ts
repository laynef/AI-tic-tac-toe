import { DifficultyType } from '../types';
import Game from '../game';


it('call Game without errors', () => {
    const unbeatable = new Game(DifficultyType.Unbeatable);
    const beatable = new Game(DifficultyType.Beatable);
    expect(unbeatable).toBeInstanceOf(Game);
    expect(beatable).toBeInstanceOf(Game);
});