// 4.  Create the main game loop and a module for DOM interaction.
// a) At this point it is appropriate to begin crafting your User Interface.
// b) The game loop should set up a new game by creating Players and Gameboards.
// For now just populate each Gameboard with predetermined coordinates. Can implement a system for allowing players to place their ships later.
// c) HTML implementation up to you, but should display both the player’s boards and render them using information from the Gameboard class.
//     i) Need methods to render gameboards and to take user input for attacking. For attacks, let the user click on a coordinate in the enemy Gameboard.
// d) The game loop should step through game turn by turn using only methods from other objects.
// If tempted to write a new function inside the game loop, step back and work out which class or module that function should belong to.
// e) Create conditions so that the game ends once one players ships have all been sunk. This function is appropriate for the Game module.

// 5. Finish it up
// a) There are several options available for letting users place their ships. You can let them type coordinates for each ship, or investigate implementing drag and drop.
// b) You can polish the intelligence of the computer player by having it try adjacent slots after getting a ‘hit’.
// c) Optionally, create a 2 player option that lets users take turns by passing the device back and forth.
// If you’re going to go this route, make sure the game is playable on a mobile screen and implement a ‘pass device’ screen so that players don’t see each others boards!

import GameboardFactory from "./factories/gameboard";
import PlayerFactory from "./factories/player";
import {
  startEventListener,
  createBoardGrids,
  renderPlayerBoats,
  renderComputerBoard,
  infoPlayerMove,
  addSquareEventListeners,
} from "./DOM";

const player = PlayerFactory();
const computerBoard = GameboardFactory();
const computer = PlayerFactory();
const playerBoard = GameboardFactory();

startEventListener();
createBoardGrids(player);

function Game() {
  /*
  // max = 10, ship = each ship object within ships array
  generateRandomLocation(board, ship) {
    let didPlace = false;
    let directionString;
    let valid;

    while(!didPlace) {
      let x = this.getRandomInt(); //can I change this to generateRandomIndex?
      let y = this.getRandomInt();

      [valid, directionString] = this.generateRandomDirection(x, y, ship);

      if (valid) {
        this.placeShip(x, y, "S", board, directionString, ship);
        didPlace = true;
      }
    }
  }
  getRandomInt = () => Math.floor(Math.random() * Math.floor(10));

  generateRandomDirection(column, row, ship) {
    let valid = false;
    let direction = Math.floor(Math.random() * 4) + 1;
    let directionString = "";

    if (direction === 1) {
      //right
      for (let index = 0; index < ship.size; index++) {
        if (
          column + index >= this.gameBoard.length || 
          this.gameBoard[row][column + index] === "S" ||
          this.gameBoard[row][column + index] === undefined
          ) {
            return [valid, directionString];
          }
      }
      valid = true;
      directionString = "right";
      return [valid, directionString];
    } else if (direction === 2) {
      //left
      for (let i = 0; i < ship.size; i++) {
        if (
          column - i < 0 ||
          this.gameBoard[row][column - i] === "S" ||
          this.gameBoard[row][column - i] === undefined
        ) {
          return [valid, directionString];
        }
      }
    }
  };
  // c = character (in this case "S" for ships)
  placeShip (x, y, c, board, direction, ship) {
    if (direction === "right") {
      for (let i = 0; i < ship.size; i++) {
        board[y][x + i] = c; // places character "S" at the coordinate
        ship.coordinates.push(`${x + i}-${y}`);
      }
    } else if (direction === "left") {
      for (let i = 0; i < ship.size; i++) {
        board[y][x - i] = c;
        ship.coordinates.push(`${x - i}-${y}`);
      }
    }
  }*/

  playerBoard.newShip(["G1", "G2", "G3", "G4", "G5"]);
  playerBoard.newShip(["B2", "C2", "D2", "E2"]);
  playerBoard.newShip(["I4", "I5", "I6", "I7"]);
  playerBoard.newShip(["A5", "A6", "A7"]);
  playerBoard.newShip(["D5", "D6", "D7"]);
  playerBoard.newShip(["H9", "I9", "J9"]);
  playerBoard.newShip(["J1", "J2"]);
  playerBoard.newShip(["C9", "D9"]);
  playerBoard.newShip(["A10", "B10"]);
  playerBoard.newShip(["E10", "F10"]);
  computerBoard.newShip(["A6", "A7", "A8", "A9", "A10"]);
  computerBoard.newShip(["H2", "H3", "H4", "H5"]);
  computerBoard.newShip(["F9", "G9", "H9", "I9"]);
  computerBoard.newShip(["C2", "D2", "E2"]);
  computerBoard.newShip(["J5", "J6", "J7"]);
  computerBoard.newShip(["D7", "D8", "D9"]);
  computerBoard.newShip(["A1", "A2"]);
  computerBoard.newShip(["J1", "J2"]);
  computerBoard.newShip(["E5", "F5"]);
  computerBoard.newShip(["B4", "C4"]);

  renderPlayerBoats(playerBoard);
  renderComputerBoard(computerBoard);

  infoPlayerMove();
  addSquareEventListeners();
}

export { Game, player, computer, playerBoard, computerBoard };
