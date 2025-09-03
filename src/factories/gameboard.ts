// factories/gameboard.ts
import { Gameboard } from "../types/gameboard";

export function GameboardFactory(name: string): Gameboard {
  const hits: string[] = [];
  const misses: string[] = [];
  const occupied: string[] = [];

  const receiveAttack = (coord: string) => {
    if (occupied.includes(coord)) hits.push(coord);
    else misses.push(coord);
  };

  const allSunk = () => {
    return occupied.length === hits.length;
  };

  const newShip = (coords: string[]) => {
    if (coords.some((coord) => occupied.includes(coord)))
      return "Coordinate(s) already occupied";
    else occupied.push(...coords);
  };

  return {
    name,
    hits,
    misses,
    occupied,
    receiveAttack,
    allSunk,
    newShip,
  };
}
