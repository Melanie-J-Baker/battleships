import { player } from "../index";
import ShipFactory from "./ship";
import { infoSunkBoat } from "../DOM";
import findNeighbours from "../helper";
import { Gameboard } from "../types/gameboard";
import { Ship } from "../types/ship";
import { Neighbours } from "../types/neighbours";

const neighbourCoords: string[] = [];

const GameboardFactory = (name: string): Gameboard => {
  const playerName: string = name;
  const shipCoordsBoard: Ship[] = [];
  const occupied: string[] = [];
  const misses: string[] = [];
  const hits: string[] = [];
  function newShip(coords: string[]): void | string {
    let blocked = occupied.some((r) => coords.indexOf(r) >= 0);
    if (blocked !== true) {
      const ship: Ship = ShipFactory(coords);
      shipCoordsBoard.push(ship);
      for (let i = 0; i < ship.shipCoords.length; i++) {
        occupied.push(ship.shipCoords[i]);
        let index = player.availableMoves.indexOf(ship.shipCoords[i]);
        let neighbours: Neighbours = findNeighbours(index);
        const neighboursArray: (number | undefined)[] =
          Object.values(neighbours);
        const validNeighbours: number[] = neighboursArray.filter(
          (x): x is number => x !== undefined,
        );
        for (let i = 0; i < validNeighbours.length; i++) {
          if (
            neighbourCoords.includes(
              player.availableMoves[validNeighbours[i]],
            ) === false
          ) {
            neighbourCoords.push(player.availableMoves[validNeighbours[i]]);
          }
        }
      }
      console.log(occupied);
    } else {
      return "Coordinate(s) already occupied";
    }
  }
  function receiveAttack(coord: string): void | string {
    if (hits.includes(coord) === false && misses.includes(coord) === false) {
      for (let i = 0; i < shipCoordsBoard.length; i++) {
        for (let j = 0; j < shipCoordsBoard[i].shipCoords.length; j++) {
          if (shipCoordsBoard[i].shipCoords[j] === coord) {
            shipCoordsBoard[i].hit(j);
            hits.push(coord);
            if (shipCoordsBoard[i].isSunk()) {
              infoSunkBoat(playerName, shipCoordsBoard[i]);
            }
          }
        }
      }
      if (occupied.includes(coord) === false) {
        misses.push(coord);
      }
    } else {
      return "Square has already been attacked!";
    }
  }
  function allSunk(): boolean {
    const sunkArray: boolean[] = shipCoordsBoard.map((ship) => ship.isSunk());
    return sunkArray.every((shipSunk) => shipSunk === true);
  }
  return {
    newShip,
    receiveAttack,
    allSunk,
    shipCoordsBoard,
    misses,
    hits,
    occupied,
  };
};
export { GameboardFactory, neighbourCoords };
