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
        ship.coordinates.push(`${x + i},${y}`);
      }
    } else if (direction === "left") {
      for (let i = 0; i < ship.size; i++) {
        board[y][x - i] = c;
        ship.coordinates.push(`${x - i},${y}`);
      }
    }
  }*/

  playerBoard.newShip(["7,1", "7,2", "7,3", "7,4", "7,5"]);
  playerBoard.newShip(["2,1", "3,1", "4,1", "5,1"]);
  playerBoard.newShip(["9,4", "9,5", "9,6", "9,7"]);
  playerBoard.newShip(["1,5", "1,6", "1,7"]);
  playerBoard.newShip(["4,5", "4,6", "4,7"]);
  playerBoard.newShip(["8,9", "9,9", "10,9"]);
  playerBoard.newShip(["10,1", "10,2"]);
  playerBoard.newShip(["3,3", "4,3"]);
  playerBoard.newShip(["1,10", "2,10"]);
  playerBoard.newShip(["5,10", "6,10"]);
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

  renderPlayerBoats(playerBoard);
  renderComputerBoard(computerBoard);

  infoPlayerMove();
  addSquareEventListeners();
}

export { Game, player, computer, playerBoard, computerBoard };
