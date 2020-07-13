import Player from '../player';
import Grid from '../grid';
import { PlayerType } from '../types';


describe('Player', () => {

    it('call without crashing', () => {
        expect(new Player(new Grid())).toBeTruthy();
    });

    describe('call methods', () => {
        
        it('getBestMove blocks Human wins', () => {
            const block = new Player(new Grid([
                [PlayerType.Player, PlayerType.Player, PlayerType.Empty],
                [PlayerType.Empty, PlayerType.Computer, PlayerType.Empty],
                [PlayerType.Empty, PlayerType.Empty, PlayerType.Empty]
            ]));

            expect(block.getBestMove()).toEqual({ x: 2, y: 0 });
        });

        it('getBestMove lets Computer win', () => {
            const win = new Player(new Grid([
                [PlayerType.Player, PlayerType.Computer, PlayerType.Empty],
                [PlayerType.Player, PlayerType.Computer, PlayerType.Empty],
                [PlayerType.Empty, PlayerType.Empty, PlayerType.Empty]
            ]));

            expect(win.getBestMove()).toEqual({ x: 0, y: 2 });
        });

    });

});
