// 2. Create Gameboard factory.
// b) Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
// c) Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the hit function to the correct ship, or records the coordinates of the missed shot.
// d) Gameboards should keep track of missed attacks so they can display them properly.
// e) Gameboards should be able to report whether or not all of their ships have been sunk.
import { GameboardFactory } from "../factories/gameboard";

test("can place ship at specific coords", () => {
  const board = GameboardFactory("test");
  board.newShip(["1,1", "1,2", "1,3", "1,4"]);
  expect(board.shipCoordsBoard[0].shipCoords).toStrictEqual([
    "1,1",
    "1,2",
    "1,3",
    "1,4",
  ]);
});
test("will not place ship in occupied square", () => {
  const board = GameboardFactory("test");
  board.newShip(["1,1", "1,2", "1,3", "1,4"]);
  const result = board.newShip(["1,1", "2,1", "3,1"]);
  expect(result).toStrictEqual("Coordinate(s) already occupied");
});
test("can receive attack and send hit to correct ship", () => {
  const board = GameboardFactory("test");
  board.newShip(["1,1", "1,2", "1,3", "1,4"]);
  board.receiveAttack("1,2");
  expect(board.shipCoordsBoard[0].shipCoords).toStrictEqual([
    "1,1",
    "hit",
    "1,3",
    "1,4",
  ]);
});
test("can receive an attack and record missed shot", () => {
  const board = GameboardFactory("test");
  board.newShip(["1,1", "1,2", "1,3", "1,4"]);
  board.receiveAttack("2,1");
  expect(board.misses).toStrictEqual(["2,1"]);
});
test("can not attack previously attacked square", () => {
  const board = GameboardFactory("test");
  board.receiveAttack("2,1");
  const result = board.receiveAttack("2,1");
  expect(result).toStrictEqual("Square has already been attacked!");
});
test("all ships sunk", () => {
  const board = GameboardFactory("test");
  board.newShip(["1,1", "1,2", "1,3", "1,4"]);
  board.newShip(["2,2", "3,2", "4,2"]);
  board.receiveAttack("1,1");
  board.receiveAttack("1,2");
  board.receiveAttack("1,3");
  board.receiveAttack("1,4");
  board.receiveAttack("2,2");
  board.receiveAttack("3,2");
  board.receiveAttack("4,2");
  const result = board.allSunk();
  expect(result).toBeTruthy();
});
test("all ships not sunk", () => {
  const board = GameboardFactory("test");
  board.newShip(["1,1", "1,2", "1,3", "1,4"]);
  board.newShip(["2,2", "3,2", "4,2"]);
  board.receiveAttack("1,1");
  board.receiveAttack("1,2");
  board.receiveAttack("1,3");
  board.receiveAttack("1,4");
  board.receiveAttack("2,2");
  board.receiveAttack("3,2");
  const result = board.allSunk();
  expect(result).toBeFalsy();
});
