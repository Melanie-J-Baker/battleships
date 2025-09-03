import { Ship } from "../types/ship";

export const ShipFactory = function (coords: string[]): Ship {
  const shipCoords: string[] = [];
  coords.map((coord: string) => {
    shipCoords.push(coord);
  });
  function hit(index: number): void {
    shipCoords[index] = "hit";
  }
  function isSunk(): boolean {
    return shipCoords.every((coord) => coord === "hit");
  }
  return {
    hit,
    isSunk,
    shipCoords,
  };
};
