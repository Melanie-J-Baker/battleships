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
