// 2. Create Gameboard factory.
// a) Note that we have not yet created any User Interface. We should know our code is coming together by running the tests. You shouldnt be relying on console.log or DOM methods to make sure your code is working.
// d) Gameboards should keep track of missed attacks so they can display them properly.
// e) Gameboards should be able to report whether or not all of their ships have been sunk.

import ShipFactory from "./ship";

const GameboardFactory = () => {
  const shipCoordsBoard = [];
  const misses = [];
  function newShip(coords) {
    // place ships at specific coordinates by calling the ship factory function
    const ship = ShipFactory(coords);
    shipCoordsBoard.push(ship);
  }
  function receiveAttack(coords) {
    for (let i = 0; i < shipCoordsBoard.length; i++) {
      for (let j = 0; j < shipCoordsBoard[i].coords.length; j++) {
        if (shipCoordsBoard[i].coords[j] === coords) {
          shipCoordsBoard[i].coords[j] = "hit";
        }
      }
    }
  }
  return {
    newShip,
    receiveAttack,
    // reportSunkShips
    shipCoordsBoard,
    misses,
    // calculateShipPlacement,
    // checkValidPositions
  };
};

export default GameboardFactory;
