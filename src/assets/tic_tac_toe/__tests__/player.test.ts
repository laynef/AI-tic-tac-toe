import Player from '../player';
import Grid from '../grid';


it('render without crashing', () => {
    expect(new Player(new Grid())).toBeTruthy();
});
