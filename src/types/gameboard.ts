export interface Gameboard {
  name: string;
  newShip: (coords: string[]) => void | string;
  receiveAttack: (coord: string) => void | string;
  allSunk: () => boolean;
  misses: string[];
  hits: string[];
  occupied: string[];
}
