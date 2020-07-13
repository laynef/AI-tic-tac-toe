import { GridType, PlayerType, CoordinateType } from './types';

class Grid {
  public grid: GridType;
  public movesMade: number;

  constructor(grid?: GridType) {
    this.grid = grid || [
      [PlayerType.Empty, PlayerType.Empty, PlayerType.Empty],
      [PlayerType.Empty, PlayerType.Empty, PlayerType.Empty],
      [PlayerType.Empty, PlayerType.Empty, PlayerType.Empty],
    ];
    this.movesMade = 0;
  }

  getRandomMove(): CoordinateType {
    const possibilities = this.allPossibilities();
    const randomIndex = Math.floor(Math.random() * possibilities.length);
    return possibilities[randomIndex];
  }

  allPossibilities(): CoordinateType[] {
    const positions = this.allPositions();
    return positions.filter(({ x, y }) => this.grid[y][x] === PlayerType.Empty);
  }

  isWinner(player: PlayerType): boolean {
    if (this.checkDiagonials(player)) return true;

    for (let i = 0; i < 3; i++) {
      if (this.checkRow(i, player)) return true;
      else if (this.checkColumn(i, player)) return true;
    }

    return false;
  }

  getWinningArray(player: PlayerType): CoordinateType[] {
    const dig = this.checkDiagonials(player);
    if (Array.isArray(dig)) return dig;

    for (let i = 0; i < 3; i++) {
      const row = this.checkRow(i, player);
      const col = this.checkColumn(i, player);

      if (Array.isArray(row)) return row;
      else if (Array.isArray(col)) return col;
    }

    return this.allPositions();
  }

  isTerminal(): boolean {
    return (
      this.isWinner(PlayerType.Player) ||
      this.isWinner(PlayerType.Computer) ||
      this.movesMade >= 9
    );
  }

  set(x: number, y: number, value: number): void {
    this.grid[y][x] = value;
    this.movesMade += 1;
  }

  clear(x: number, y: number): void {
    this.grid[y][x] = PlayerType.Empty;
    this.movesMade -= 1;
  }

  private checkRow(
    index: number,
    player: PlayerType
  ): CoordinateType[] | boolean {
    const row = this.grid[index];
    return (
      row[0] === player &&
      row[1] === player &&
      row[2] === player && [
        { x: 0, y: index },
        { x: 1, y: index },
        { x: 2, y: index },
      ]
    );
  }

  private checkColumn(
    index: number,
    player: PlayerType
  ): CoordinateType[] | boolean {
    return (
      this.grid[0][index] === player &&
      this.grid[1][index] === player &&
      this.grid[2][index] === player && [
        { y: 0, x: index },
        { y: 1, x: index },
        { y: 2, x: index },
      ]
    );
  }

  private checkDiagonials(player: PlayerType): CoordinateType[] | boolean {
    return (
      (this.grid[0][0] === player &&
        this.grid[1][1] === player &&
        this.grid[2][2] === player && [
          { y: 0, x: 0 },
          { y: 1, x: 1 },
          { y: 2, x: 2 },
        ]) ||
      (this.grid[0][2] === player &&
        this.grid[1][1] === player &&
        this.grid[2][0] === player && [
          { y: 0, x: 2 },
          { y: 1, x: 1 },
          { y: 2, x: 0 },
        ])
    );
  }

  private allPositions(): CoordinateType[] {
    return [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ];
  }
}

export default Grid;
