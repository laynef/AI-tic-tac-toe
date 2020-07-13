import { DifficultyType } from '../types';
import Game from '../game';


it('render without crashing', () => {
    expect(new Game(DifficultyType.Unbeatable)).toBeTruthy();
});
