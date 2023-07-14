// 3. Create Player.
// a) Players can take turns playing the game by attacking the enemy Gameboard.
// b) The game is played against the computer, so make the computer capable of making random plays. The AI does not have to be smart, but it should know whether or not a given move is legal. (i.e. it shouldnt shoot the same coordinate twice).
import PlayerFactory from "../factories/player";
import GameboardFactory from "../factories/gameboard";

test("player can attack computer", () => {
  const computerBoard = GameboardFactory();
  const player = PlayerFactory();
  computerBoard.newShip(["D4", "E4", "F4"]);
  player.attack(computerBoard, "E4");

  expect(computerBoard.hits).toStrictEqual(["E4"]);
});

test("player misses computers ships", () => {
  const computerBoard = GameboardFactory();
  const player = PlayerFactory();
  computerBoard.newShip(["D4", "E4", "F4"]);
  player.attack(computerBoard, "A4");

  expect(computerBoard.misses).toStrictEqual(["A4"]);
});

test("player cannot attack same square twice", () => {
  const computerBoard = GameboardFactory();
  const player = PlayerFactory();
  computerBoard.newShip(["D4", "E4", "F4"]);
  player.attack(computerBoard, "E4");
  const result = player.attack(computerBoard, "E4");

  expect(computerBoard.hits).toStrictEqual(["E4"]);
  expect(result).toStrictEqual("That move is not available");
});

test("computer can random attack player", () => {
  const playerBoard = GameboardFactory();
  const computer = PlayerFactory();
  playerBoard.newShip(["A1", "A2", "A3", "A4"]);
  computer.randomAttack(playerBoard);
  const moves = playerBoard.hits + playerBoard.misses;

  expect(moves).not.toStrictEqual([]);
});

test("player destroys computer ships", () => {
  const computerBoard = GameboardFactory();
  const player = PlayerFactory();
  computerBoard.newShip(["D4", "E4", "F4"]);
  player.attack(computerBoard, "D4");
  player.attack(computerBoard, "E4");
  player.attack(computerBoard, "F4");

  expect(computerBoard.allSunk()).toBeTruthy();
  expect(computerBoard.shipCoordsBoard[0].shipCoords).toStrictEqual([
    "hit",
    "hit",
    "hit",
  ]);
});
