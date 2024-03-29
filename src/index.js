import { GameboardFactory } from "./factories/gameboard";
import PlayerFactory from "./factories/player";
import {
  startEventListener,
  createComputerGrid,
  renderMovableBoats,
  addBoatEventListeners,
  renderComputerBoard,
  infoPlayerMove,
  addSquareEventListeners,
} from "./DOM";

const player = PlayerFactory();
const computerBoard = GameboardFactory("Computer");
const computer = PlayerFactory();
const playerBoard = GameboardFactory("Player");

startEventListener();

function Game() {
  renderMovableBoats();
  addBoatEventListeners();
}

function playGame() {
  computerBoard.newShip(["1,6", "1,7", "1,8", "1,9", "1,10"]);
  computerBoard.newShip(["8,2", "8,3", "8,4", "8,5"]);
  computerBoard.newShip(["6,9", "7,9", "8,9", "9,9"]);
  computerBoard.newShip(["3,2", "4,2", "5,2"]);
  computerBoard.newShip(["10,5", "10,6", "10,7"]);
  computerBoard.newShip(["4,7", "4,8", "4,9"]);
  computerBoard.newShip(["1,1", "1,2"]);
  computerBoard.newShip(["10,1", "10,2"]);
  computerBoard.newShip(["5,5", "6,5"]);
  computerBoard.newShip(["2,4", "3,4"]);

  const computerGrid = document.getElementById("computerGrid");
  const displayDiv = document.getElementById("boatsDisplay");
  computerGrid.removeChild(displayDiv);
  computerGrid.className = "grid";
  createComputerGrid(player);
  renderComputerBoard(computerBoard);
  infoPlayerMove();
  addSquareEventListeners();
}

export { Game, player, computer, playerBoard, computerBoard, playGame };
