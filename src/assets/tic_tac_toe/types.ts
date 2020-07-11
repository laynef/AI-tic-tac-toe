export type GridType = number[][];
export interface CoordinateType { x: number; y: number; };
export enum PlayerType { Player = 1, Computer = 2, Tied = 0 }
export enum DifficultyType { Beatable = 'Beatable', Unbeatable = 'Unbeatable' }
export enum PossibilityType { Player = 1, Computer = 2, Empty = 0 };