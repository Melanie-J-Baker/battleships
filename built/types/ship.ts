export interface Ship {
  shipCoords: string[];
  hit: (index: number) => void;
  isSunk: () => boolean;
}
