import { createPlayersAndBoards } from "../index";
import { Player } from "../types/player";
import { Gameboard } from "../types/gameboard";

describe("PlayerFactory", () => {
  let player: Player,
    computer: Player,
    playerBoard: Gameboard,
    computerBoard: Gameboard;

  beforeEach(() => {
    ({ player, computer, playerBoard, computerBoard } =
      createPlayersAndBoards());
  });

  test("player has available moves", () => {
    expect(player.availableMoves.length).toBe(100);
  });

  test("player can attack computer", () => {
    const target = player.availableMoves[0];
    player.attack(computerBoard, target);
    expect(player.availableMoves).not.toContain(target);
    expect([...computerBoard.hits, ...computerBoard.misses]).toContain(target);
  });

  test("player misses computers ships", () => {
    computerBoard.newShip(["4,4", "5,4", "6,4"]);
    player.attack(computerBoard, "1,4");
    expect(computerBoard.misses).toStrictEqual(["1,4"]);
  });

  test("player cannot attack same square twice", () => {
    computerBoard.newShip(["4,4", "5,4", "6,4"]);
    player.attack(computerBoard, "5,4");
    const result = player.attack(computerBoard, "5,4");
    expect(computerBoard.hits).toStrictEqual(["5,4"]);
    expect(result).toStrictEqual("That move is not available");
  });
  test("computer can random attack player", () => {
    playerBoard.newShip(["1,1", "1,2", "1,3", "1,4"]);
    computer.computerMove(playerBoard);
    const moves = playerBoard.hits.length + playerBoard.misses.length;
    expect(moves).not.toStrictEqual(0);
  });
  test("player destroys computer ships", () => {
    computerBoard.newShip(["4,4", "5,4", "6,4"]);
    player.attack(computerBoard, "4,4");
    player.attack(computerBoard, "5,4");
    player.attack(computerBoard, "6,4");
    expect(computerBoard.allSunk()).toBeTruthy();
    expect(computerBoard.hits).toStrictEqual(["4,4", "5,4", "6,4"]);
  });
});
