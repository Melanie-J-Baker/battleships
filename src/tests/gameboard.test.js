// 2. Create Gameboard factory.
// b) Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
// c) Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the hit function to the correct ship, or records the coordinates of the missed shot.
// d) Gameboards should keep track of missed attacks so they can display them properly.
// e) Gameboards should be able to report whether or not all of their ships have been sunk.

import GameboardFactory from "../factories/gameboard";

test("can place ship at specific coords", () => {
  const board = GameboardFactory();
  board.newShip(["A1", "A2", "A3", "A4"]);

  expect(board.shipCoordsBoard[0].shipCoords).toStrictEqual([
    "A1",
    "A2",
    "A3",
    "A4",
  ]);
});

test("can receive attack and send hit to correct ship", () => {
  const board = GameboardFactory();
  board.newShip(["A1", "A2", "A3", "A4"]);
  board.receiveAttack("A2");

  expect(board.shipCoordsBoard[0].shipCoords).toStrictEqual([
    "A1",
    "hit",
    "A3",
    "A4",
  ]);
});

test("can receive an attack and record missed shot", () => {
  const board = GameboardFactory();
  board.newShip(["A1", "A2", "A3", "A4"]);
  board.receiveAttack("B1");

  expect(board.misses).toStrictEqual(["B1"]);
});

test("can not attack previously attacked square", () => {
  const board = GameboardFactory();
  board.receiveAttack("B1");
  const result = board.receiveAttack("B1");

  expect(result).toStrictEqual("Square has already been attacked!");
});

test("all ships sunk when one ship on board", () => {
  const board = GameboardFactory();
  board.newShip(["A1", "A2", "A3", "A4"]);
  board.receiveAttack("A1");
  board.receiveAttack("A2");
  board.receiveAttack("A3");
  board.receiveAttack("A4");
  const result = board.allSunk();

  expect(result).toStrictEqual(true);
});
