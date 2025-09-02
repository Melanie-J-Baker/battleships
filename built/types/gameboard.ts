import { Ship } from "./ship";

export interface Gameboard {
  newShip: (coords: string[]) => void | string;
  receiveAttack: (coord: string) => void | string;
  allSunk: () => boolean;
  shipCoordsBoard: Ship[];
  misses: string[];
  hits: string[];
  occupied: string[];
}
