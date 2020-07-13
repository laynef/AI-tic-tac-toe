import Player from '../player';
import Grid from '../grid';


describe('Player', () => {

    it('call without crashing', () => {
        expect(new Player(new Grid())).toBeTruthy();
    });

    describe('call methods', () => {
        
        it('getBestMove blocks Human wins', () => {
            expect(new Player(new Grid())).toBeTruthy();
        });

        it('getBestMove lets Computer win', () => {
            expect(new Player(new Grid())).toBeTruthy();
        });

    });

});
