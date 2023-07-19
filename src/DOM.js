// 4. Create the main game loop and a module for DOM interaction.
// a) At this point it is appropriate to begin crafting your User Interface.
// b) The game loop should set up a new game by creating Players and Gameboards. For now just populate each Gameboard with predetermined coordinates. Can implement a system for allowing players to place their ships later.
// c) We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using information from the Gameboard class.
//     i) You need methods to render the gameboards and to take user input for attacking. For attacks, let the user click on a coordinate in the enemy Gameboard.
// d) The game loop should step through the game turn by turn using only methods from other objects. If at any point you are tempted to write a new function inside the game loop, step back and figure out which class or module that function should belong to.
// e) Create conditions so that the game ends once one players ships have all been sunk. This function is appropriate for the Game module.

// 5. Finish it up
// a) There are several options available for letting users place their ships. You can let them type coordinates for each ship, or investigate implementing drag and drop.
// b) You can polish the intelligence of the computer player by having it try adjacent slots after getting a ‘hit’.
// c) Optionally, create a 2 player option that lets users take turns by passing the device back and forth. If you’re going to go this route, make sure the game is playable on a mobile screen and implement a ‘pass device’ screen so that players don’t see each others boards!
import { Game, player } from "./index";

function createBoardGrids(player) {
  const playerGrid = document.getElementById("playerGrid");
  const computerGrid = document.getElementById("computerGrid");
  for (let i = 0; i < 100; i++) {
    let playerSquare = document.createElement("div");
    let computerSquare = document.createElement("div");
    playerSquare.className = "square pSquare";
    playerSquare.id = "p" + `${player.availableMoves[i]}`;
    computerSquare.className = "square cSquare";
    computerSquare.id = "c" + `${player.availableMoves[i]}`;
    playerGrid.appendChild(playerSquare);
    computerGrid.appendChild(computerSquare);
  }
}

function startEventListener() {
  const start = document.getElementById("start");
  start.addEventListener("click", Game);
}

function renderPlayerBoats(playerBoard) {
  const playerSquares = document.getElementById("playerGrid").children;
  for (let i = 0; i < playerSquares.length; i++) {
    let gridCoord = playerSquares[i].id.slice(1);
    if (playerBoard.occupied.includes(gridCoord)) {
      playerSquares[i].className = "square pSquare occupied";
    }
  }
}

function renderComputerBoard(computerBoard) {
  const cSquares = document.getElementsByClassName("square cSquare");
  for (let i = 0; i < cSquares.length; i++) {
    if (computerBoard.hits.includes(cSquares[i].id.slice(1)) === true) {
      cSquares[i].className = "square cSquare hit";
    } else if (
      computerBoard.misses.includes(cSquares[i].id.slice(1)) === true
    ) {
      cSquares[i].className = "square cSquare miss";
    }
  }
}

function renderPlayerBoard(playerBoard) {
  const pSquares = document.getElementsByClassName("square pSquare");
  for (let i = 0; i < pSquares.length; i++) {
    if (playerBoard.hits.includes(pSquares[i].id.slice(1)) === true) {
      pSquares[i].className = "square pSquare hit";
    } else if (playerBoard.misses.includes(pSquares[i].id.slice(1)) === true) {
      pSquares[i].className = "square pSquare miss";
    }
  }
}

function addSquareEventListeners() {
  const cSquares = document.getElementsByClassName("square cSquare");
  for (var i = 0; i < cSquares.length; i++) {
    cSquares[i].addEventListener("click", player.playerMove);
  }
}

function removeSquareEventListeners() {
  const cSquares = document.getElementsByClassName("square cSquare");
  for (var i = 0; i < cSquares.length; i++) {
    cSquares[i].removeEventListener("click", player.playerMove);
  }
}

export {
  startEventListener,
  createBoardGrids,
  renderPlayerBoats,
  renderComputerBoard,
  addSquareEventListeners,
  removeSquareEventListeners,
  renderPlayerBoard,
};
