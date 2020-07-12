export interface CoordinateType { x: number; y: number; };
export enum PlayerType { Player = 1, Computer = 2, Empty = 0 }
export enum DifficultyType { Beatable = 'Beatable', Unbeatable = 'Unbeatable' }
export type GridType = PlayerType[][];
