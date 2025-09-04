import { GameboardFactory } from "./factories/gameboard";
import { PlayerFactory } from "./factories/player";
import {
  startEventListener,
  createComputerGrid,
  renderMovableBoats,
  addBoatEventListeners,
  renderComputerBoard,
  infoPlayerMove,
  addSquareEventListeners,
  renderPlayerBoard,
} from "./DOM";
import { Gameboard } from "./types/gameboard";
import { Player } from "./types/player";

startEventListener();

export function createPlayersAndBoards() {
  const player: Player = PlayerFactory();
  const computer: Player = PlayerFactory();
  const playerBoard: Gameboard = GameboardFactory("Player");
  const computerBoard: Gameboard = GameboardFactory("Computer");

  return { player, computer, playerBoard, computerBoard };
}

export function initGame(): void {
  const { player, computer, playerBoard, computerBoard } =
    createPlayersAndBoards();
  renderMovableBoats(player);
  addBoatEventListeners();
}

export function startBattle(
  player: Player,
  computer: Player,
  playerBoard: Gameboard,
  computerBoard: Gameboard,
) {
  createComputerGrid(computer, computerBoard);
  renderPlayerBoard(playerBoard);
  renderComputerBoard(computerBoard);
  infoPlayerMove();
  addSquareEventListeners((e: MouseEvent) =>
    player.playerMove(e, computerBoard),
  );
}
