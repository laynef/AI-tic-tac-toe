import Player from '../player';
import Grid from '../grid';

describe('Player', () => {

    it('call without crashing', () => {
        expect(new Player(new Grid())).toBeTruthy();
    });

});
