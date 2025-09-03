import { PlayerFactory } from "../factories/player";
import { GameboardFactory } from "../factories/gameboard";

test("player can attack computer", () => {
  const computerBoard = GameboardFactory("test");
  const player = PlayerFactory();
  computerBoard.newShip(["4,4", "5,4", "6,4"]);
  player.attack(computerBoard, "5,4");
  expect(computerBoard.hits).toStrictEqual(["5,4"]);
});
test("player misses computers ships", () => {
  const computerBoard = GameboardFactory("test");
  const player = PlayerFactory();
  computerBoard.newShip(["4,4", "5,4", "6,4"]);
  player.attack(computerBoard, "1,4");
  expect(computerBoard.misses).toStrictEqual(["1,4"]);
});
test("player cannot attack same square twice", () => {
  const computerBoard = GameboardFactory("test");
  const player = PlayerFactory();
  computerBoard.newShip(["4,4", "5,4", "6,4"]);
  player.attack(computerBoard, "5,4");
  const result = player.attack(computerBoard, "5,4");
  expect(computerBoard.hits).toStrictEqual(["5,4"]);
  expect(result).toStrictEqual("That move is not available");
});
test("computer can random attack player", () => {
  const playerBoard = GameboardFactory("test");
  const computer = PlayerFactory();
  playerBoard.newShip(["1,1", "1,2", "1,3", "1,4"]);
  computer.computerMove(playerBoard);
  const moves = playerBoard.hits.length + playerBoard.misses.length;
  expect(moves).not.toStrictEqual(0);
});
test("player destroys computer ships", () => {
  const computerBoard = GameboardFactory("test");
  const player = PlayerFactory();
  computerBoard.newShip(["4,4", "5,4", "6,4"]);
  player.attack(computerBoard, "4,4");
  player.attack(computerBoard, "5,4");
  player.attack(computerBoard, "6,4");
  expect(computerBoard.allSunk()).toBeTruthy();
  expect(computerBoard.hits).toStrictEqual(["4,4", "5,4", "6,4"]);
});
