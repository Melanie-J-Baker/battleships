// 2. Create Gameboard factory.
// b) Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
// c) Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the hit function to the correct ship, or records the coordinates of the missed shot.
// d) Gameboards should keep track of missed attacks so they can display them properly.
// e) Gameboards should be able to report whether or not all of their ships have been sunk.

import GameboardFactory from "../factories/gameboard";

test("can place ship at specific coords", () => {
  const board = GameboardFactory();
  board.newShip(["A1", "A2", "A3", "A4"]);

  expect(board.shipCoordsBoard[0].coords).toStrictEqual([
    "A1",
    "A2",
    "A3",
    "A4",
  ]);
});
