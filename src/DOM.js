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
import { Game, player, playerBoard, playGame } from "./index";

function createPlayerGrid(player) {
  const playerGrid = document.getElementById("playerGrid");
  const playerHeader = document.getElementById("playerHeader");
  for (let i = 0; i < 100; i++) {
    let playerSquare = document.createElement("div");
    playerSquare.className = "square pSquare";
    playerSquare.id = "p" + `${player.availableMoves[i]}`;
    playerSquare.addEventListener("dragover", dragoverHandler);
    playerSquare.addEventListener("drop", dropHandler);
    playerGrid.appendChild(playerSquare);
  }
  playerHeader.textContent = "Player";
}

function createComputerGrid(player) {
  const computerGrid = document.getElementById("computerGrid");
  const computerHeader = document.getElementById("computerHeader");
  for (let i = 0; i < 100; i++) {
    let computerSquare = document.createElement("div");
    computerSquare.className = "square cSquare";
    computerSquare.id = "c" + `${player.availableMoves[i]}`;
    computerGrid.appendChild(computerSquare);
  }
  computerHeader.textContent = "Computer";
}

function startEventListener() {
  const start = document.getElementById("start");
  start.addEventListener("click", function () {
    if (start.textContent === "Start Game") {
      start.textContent = "Restart Game";
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

  infoBox.textContent = "Place your ships on the grid. Click to rotate ship";

  for (let i = 0; i < shipSizeArray.length; i++) {
    let boat = document.createElement("div");
    switch (shipSizeArray[i][0]) {
      case "C":
        boat.className = "boat carrier";
        boat.id = "carrier" + `${i}`;
        for (let j = 0; j < shipSizeArray[i].length; j++) {
          let boatSquare = document.createElement("div");
          boatSquare.className = "boatSquare carrierSquare";
          boatSquare.draggable = false;
          boat.appendChild(boatSquare);
        }
        break;
      case "B":
        boat.className = "boat battleship";
        boat.id = "battleship" + `${i}`;
        for (let j = 0; j < shipSizeArray[i].length; j++) {
          let boatSquare = document.createElement("div");
          boatSquare.className = "boatSquare battleshipSquare";
          boatSquare.draggable = false;
          boat.appendChild(boatSquare);
        }
        break;
      case "D":
        boat.className = "boat destroyer";
        boat.id = "destroyer" + `${i}`;
        for (let j = 0; j < shipSizeArray[i].length; j++) {
          let boatSquare = document.createElement("div");
          boatSquare.className = "boatSquare destroyerSquare";
          boatSquare.draggable = false;
          boat.appendChild(boatSquare);
        }
        break;
      case "P":
        boat.className = "boat patrolboat";
        boat.id = "patrolboat" + `${i}`;
        for (let j = 0; j < shipSizeArray[i].length; j++) {
          let boatSquare = document.createElement("div");
          boatSquare.className = "boatSquare patrolboatSquare";
          boatSquare.draggable = false;
          boat.appendChild(boatSquare);
        }
        break;
      default:
        alert("Something went wrong when creating boats!");
        break;
    }
    displayDiv.appendChild(boat);
  }
}

function addBoatEventListeners() {
  const boats = document.getElementsByClassName("boat");
  for (let i = 0; i < boats.length; i++) {
    let boat = boats[i];
    boat.draggable = true;
    boat.addEventListener("dragstart", dragstartHandler);
    boat.addEventListener("click", function () {
      if (boat.classList.contains("vertical")) {
        boat.classList.remove("vertical");
      } else {
        boat.classList.add("vertical");
      }
    });
  }
}

function dragstartHandler(e) {
  const infoBox = document.getElementById("info");
  e.dataTransfer.setData("text", e.target.id);
  e.dataTransfer.setData("text/class", e.target.classList);
  infoBox.textContent = "Place your ships on the grid. Click to rotate ship";
}

function dragoverHandler(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}

function dropHandler(e) {
  e.preventDefault();
  const infoBox = document.getElementById("info");
  let movedID = e.dataTransfer.getData("text");
  let movedClass = e.dataTransfer.getData("text/class");
  let boat = document.getElementById(movedID);
  let length = boat.children.length;
  let checkValidity = checkValid(e.target.id, movedID, movedClass);
  let newBoatCoords = [];
  if (checkValidity === false) {
    infoBox.textContent = "Boat cannot be placed there!";
  } else {
    for (let i = 0; i < length; i++) {
      if (movedClass.includes("vertical")) {
        let movedCoord = e.target.id.slice(1);
        let x = movedCoord.split(",")[0];
        let y = movedCoord.split(",")[1];
        let newX = +x + i;
        let newXString = newX.toString();
        let newID = "p" + newXString + "," + y;
        if (checkAvailable(playerBoard, newID) === true) {
          let newCoord = newXString + "," + y;
          newBoatCoords.push(newCoord);
          let nextSquare = document.getElementById(newID);
          boat.children[0].id = newID;
          nextSquare.parentNode.replaceChild(boat.children[0], nextSquare);
        } else {
          infoBox.textContent = "Boat cannot be placed there!";
        }
      } else {
        let movedCoord = e.target.id.slice(1);
        let x = movedCoord.split(",")[0];
        let y = movedCoord.split(",")[1];
        let newY = +y + i;
        let newYString = newY.toString();
        let newID = "p" + x + "," + newYString;
        if (checkAvailable(playerBoard, newID) === true) {
          let newCoord = x + "," + newYString;
          newBoatCoords.push(newCoord);
          let nextSquare = document.getElementById(newID);
          boat.children[0].id = newID;
          nextSquare.parentNode.replaceChild(boat.children[0], nextSquare);
        } else {
          infoBox.textContent = "Boat cannot be placed there!";
        }
      }
    }
  }
  playerBoard.newShip(newBoatCoords);
  renderPlayerBoats(playerBoard);
  if (playerBoard.occupied.length === 30) {
    playGame();
  }
}

function checkValid(target, movedID, movedClass) {
  let shipType = movedID.slice(0, -1);
  let targetPosition = target.slice(1);
  let x = targetPosition.split(",")[0];
  let y = targetPosition.split(",")[1];
  let length;
  switch (shipType) {
    case "carrier":
      length = 5;
      break;
    case "battleship":
      length = 4;
      break;
    case "destroyer":
      length = 3;
      break;
    case "patrolboat":
      length = 2;
      break;
  }
  if (movedClass.includes("vertical")) {
    if (+x + length <= 11 && +x > 0 && y > 0 && y <= 10) {
      return true;
    } else {
      return false;
    }
  } else {
    if (+y + length <= 11 && +y > 0 && x > 0 && x <= 10) {
      return true;
    } else {
      return false;
    }
  }
}

function checkAvailable(board, target) {
  if (board.occupied.includes(target)) {
    return false;
  } else {
    return true;
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
  if (infoBox.textContent !== "Computer is taking their turn.") {
    setTimeout(() => {
      infoBox.textContent = "Your move! Choose a square to attack.";
    }, 2000);
  } else {
    infoBox.textContent = "Your move! Choose a square to attack.";
  }
}

function infoComputerMove() {
  const infoBox = document.getElementById("info");
  if (infoBox.textContent !== "Your move! Choose a square to attack.") {
    setTimeout(() => {
      infoBox.textContent = "Computer is taking their turn.";
    }, 2000);
  } else {
    infoBox.textContent = "Computer is taking their turn.";
  }
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

function infoSunkBoat(playerName, shipCoordsArray) {
  const infoBox = document.getElementById("info");
  let length = shipCoordsArray.shipCoords.length;
  console.log(playerName);
  switch (length) {
    case 5:
      infoBox.textContent = `${playerName}'s Carrier sunk!`;
      break;
    case 4:
      infoBox.textContent = `${playerName}'s Battleship sunk!`;
      break;
    case 3:
      infoBox.textContent = `${playerName}'s Destroyer sunk!`;
      break;
    case 2:
      infoBox.textContent = `${playerName}'s Patrol boat sunk!`;
      break;
  }
}
export {
  startEventListener,
  renderMovableBoats,
  addBoatEventListeners,
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
  infoSunkBoat,
};
