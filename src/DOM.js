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
import { Game, player, playerBoard } from "./index";

function createPlayerGrid(player) {
  const playerGrid = document.getElementById("playerGrid");
  for (let i = 0; i < 100; i++) {
    let playerSquare = document.createElement("div");
    playerSquare.className = "square pSquare";
    playerSquare.id = "p" + `${player.availableMoves[i]}`;
    playerGrid.appendChild(playerSquare);
  }
}

function createComputerGrid(player) {
  const computerGrid = document.getElementById("computerGrid");
  const header = document.getElementById("computerHeader");
  for (let i = 0; i < 100; i++) {
    let computerSquare = document.createElement("div");
    computerSquare.className = "square cSquare";
    computerSquare.id = "c" + `${player.availableMoves[i]}`;
    computerGrid.appendChild(computerSquare);
  }
  header.textContent = "Computer";
}

function startEventListener() {
  const start = document.getElementById("start");
  start.addEventListener("click", function () {
    if (start.textContent === "Start Game") {
      start.textContent = "Restart";
      Game();
    } else {
      window.location.reload();
    }
  });
}

function renderMovableBoats() {
  const infoBox = document.getElementById("info");
  const computerGrid = document.getElementById("computerGrid");
  const shipSizeArray = [
    ["C", "C", "C", "C", "C"],
    ["B", "B", "B", "B"],
    ["B", "B", "B", "B"],
    ["D", "D", "D"],
    ["D", "D", "D"],
    ["D", "D", "D"],
    ["P", "P"],
    ["P", "P"],
    ["P", "P"],
    ["P", "P"],
  ];

  const displayDiv = document.createElement("div");
  displayDiv.id = "boatsDisplay";
  computerGrid.className = "";
  computerGrid.appendChild(displayDiv);
  createPlayerGrid(player);
  infoBox.textContent = "Please place the ships on your grid";
  for (let i = 0; i < shipSizeArray.length; i++) {
    let boat = document.createElement("div");
    switch (shipSizeArray[i][0]) {
      case "C":
        boat.className = "boat carrier";
        for (let j = 0; j < shipSizeArray[i].length; j++) {
          let boatSquare = document.createElement("div");
          boatSquare.className = "boatSquare carrierSquare";
          boat.appendChild(boatSquare);
        }
        break;
      case "B":
        boat.className = "boat battleship";
        for (let j = 0; j < shipSizeArray[i].length; j++) {
          let boatSquare = document.createElement("div");
          boatSquare.className = "boatSquare battleshipSquare";
          boat.appendChild(boatSquare);
        }
        break;
      case "D":
        boat.className = "boat destroyer";
        for (let j = 0; j < shipSizeArray[i].length; j++) {
          let boatSquare = document.createElement("div");
          boatSquare.className = "boatSquare destroyerSquare";
          boat.appendChild(boatSquare);
        }
        break;
      case "P":
        boat.className = "boat patrolboat";
        for (let j = 0; j < shipSizeArray[i].length; j++) {
          let boatSquare = document.createElement("div");
          boatSquare.className = "boatSquare patrolboatSquare";
          boat.appendChild(boatSquare);
        }
        break;
      default:
        console.log("Something went wrong when creating boats!");
        break;
    }
    displayDiv.appendChild(boat);
  }
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

function infoPlayerMove() {
  const infoBox = document.getElementById("info");
  infoBox.textContent = "Your move! Choose a square to attack.";
}

function infoComputerMove() {
  const infoBox = document.getElementById("info");
  infoBox.textContent = "Computer is taking their turn.";
}

function infoRepeatMove() {
  const infoBox = document.getElementById("info");
  infoBox.textContent = "That square has already been attacked!";
}

function infoPlayerWin() {
  const infoBox = document.getElementById("info");
  infoBox.textContent = "You have won!";
}

function infoComputerWin() {
  const infoBox = document.getElementById("info");
  infoBox.textContent = "Computer has sunk all your ships! You lose!";
}

export {
  startEventListener,
  renderMovableBoats,
  createPlayerGrid,
  createComputerGrid,
  renderPlayerBoats,
  renderComputerBoard,
  addSquareEventListeners,
  removeSquareEventListeners,
  renderPlayerBoard,
  infoPlayerMove,
  infoComputerMove,
  infoRepeatMove,
  infoPlayerWin,
  infoComputerWin,
};
