import { GameboardFactory } from "../factories/gameboard";

test("can place ship at specific coords", () => {
  const board = GameboardFactory("test");
  board.newShip(["1,1", "1,2", "1,3", "1,4"]);
  expect(board.occupied).toStrictEqual(["1,1", "1,2", "1,3", "1,4"]);
});
test("will not place ship in occupied square", () => {
  const board = GameboardFactory("test");
  board.newShip(["1,1", "1,2", "1,3", "1,4"]);
  const result = board.newShip(["1,1", "2,1", "3,1"]);
  expect(result).toStrictEqual("Coordinate(s) already occupied");
});
test("can receive attack and add hit to hits array on board", () => {
  const board = GameboardFactory("test");
  board.newShip(["1,1", "1,2", "1,3", "1,4"]);
  board.receiveAttack("1,2");
  expect(board.hits).toStrictEqual(["1,2"]);
});
test("can receive an attack and record missed shot", () => {
  const board = GameboardFactory("test");
  board.newShip(["1,1", "1,2", "1,3", "1,4"]);
  board.receiveAttack("2,1");
  expect(board.misses).toStrictEqual(["2,1"]);
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
