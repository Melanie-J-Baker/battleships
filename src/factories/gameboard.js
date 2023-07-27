// 2. Create Gameboard factory.
// a) Note that we have not yet created any User Interface. We should know our code is coming together by running the tests. You shouldnt be relying on console.log or DOM methods to make sure your code is working.
// d) Gameboards should keep track of missed attacks so they can display them properly.
// e) Gameboards should be able to report whether or not all of their ships have been sunk.

import { player } from "../index";
import ShipFactory from "./ship";
import { infoSunkBoat } from "../DOM";
import findNeighbours from "../helper";

const neighbourCoords = [];

const GameboardFactory = (name) => {
  const playerName = name;
  const shipCoordsBoard = [];
  const occupied = [];
  const misses = [];
  const hits = [];

  function newShip(coords) {
    let blocked = occupied.some((r) => coords.indexOf(r) >= 0);
    if (coords.some((coord) => neighbourCoords.includes(coord)) === true) {
      blocked = true;
    }
    if (blocked !== true) {
      // place ships at specific coordinates by calling the ship factory function
      const ship = ShipFactory(coords);
      shipCoordsBoard.push(ship);
      for (let i = 0; i < ship.shipCoords.length; i++) {
        occupied.push(ship.shipCoords[i]);
        let index = player.availableMoves.indexOf(ship.shipCoords[i]);
        let neighbours = findNeighbours(index);
        const neighboursArray = Object.values(neighbours);
        const validNeighbours = neighboursArray.filter((x) => x !== undefined);
        for (let i = 0; i < validNeighbours.length; i++) {
          if (
            neighbourCoords.includes(
              player.availableMoves[validNeighbours[i]],
            ) === false
          ) {
            neighbourCoords.push(player.availableMoves[validNeighbours[i]]);
            console.log(neighbourCoords);
          }
        }
      }
    } else {
      return "Coordinate(s) already occupied";
    }
  }

  function receiveAttack(coord) {
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

  function allSunk() {
    const sunkArray = shipCoordsBoard.map((ship) => ship.isSunk());
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
