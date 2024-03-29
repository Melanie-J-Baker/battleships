import { Game, player, playerBoard, playGame } from "./index";
import { neighbourCoords } from "./factories/gameboard";

const playerGrid = document.getElementById("playerGrid");
const playerHeader = document.getElementById("playerHeader");
const computerGrid = document.getElementById("computerGrid");
const computerHeader = document.getElementById("computerHeader");
const start = document.getElementById("start");
const heading = document.querySelector("h1");
const infoBox = document.getElementById("info");
const displayDiv = document.createElement("div");
const winnerText = document.getElementById("winner");

function createPlayerGrid(player) {
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
  for (let i = 0; i < 100; i++) {
    let computerSquare = document.createElement("div");
    computerSquare.className = "square cSquare";
    computerSquare.id = "c" + `${player.availableMoves[i]}`;
    computerGrid.appendChild(computerSquare);
  }
  computerHeader.textContent = "Computer";
}

function startEventListener() {
  start.addEventListener("click", function () {
    if (start.textContent === "Start Game") {
      start.textContent = "Restart Game";
      heading.classList.remove("large");
      infoBox.style.display = "block";
      Game();
    } else {
      window.location.reload();
    }
  });
}

function renderMovableBoats() {
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
  let movedID = e.dataTransfer.getData("text");
  let movedClass = e.dataTransfer.getData("text/class");
  let boat = document.getElementById(movedID);
  let length = boat.children.length;
  let checkValidity = checkValid(e.target.id, movedID, movedClass);
  let newBoatCoords = [];
  let validBoat;
  if (checkValidity === false || validBoat === false) {
    infoBox.textContent = "Boat cannot be placed there!";
    validBoat = false;
    newBoatCoords = [];
    boat.draggable = false;
    boat.draggable = true;
  } else {
    for (let i = 0; i < length; i++) {
      if (movedClass.includes("vertical")) {
        let movedCoord = e.target.id.slice(1);
        let x = movedCoord.split(",")[0];
        let y = movedCoord.split(",")[1];
        let newX = +x + i;
        let newXString = newX.toString();
        let newID = "p" + newXString + "," + y;
        let newCoord = newXString + "," + y;
        if (
          checkAvailable(playerBoard, newID) === true &&
          neighbourCoords.includes(newCoord) === false &&
          validBoat !== false
        ) {
          newBoatCoords.push(newCoord);
          let nextSquare = document.getElementById(newID);
          boat.children[0].id = newID;
          nextSquare.parentNode.replaceChild(boat.children[0], nextSquare);
        } else {
          infoBox.textContent = "Boat cannot be placed there!";
          newBoatCoords = [];
          validBoat = false;
          boat.draggable = false;
          boat.draggable = true;
        }
      } else {
        let movedCoord = e.target.id.slice(1);
        let x = movedCoord.split(",")[0];
        let y = movedCoord.split(",")[1];
        let newY = +y + i;
        let newYString = newY.toString();
        let newCoord = x + "," + newYString;
        let newID = "p" + x + "," + newYString;
        if (
          checkAvailable(playerBoard, newID) === true &&
          neighbourCoords.includes(newCoord) === false &&
          validBoat !== false
        ) {
          newBoatCoords.push(newCoord);
          let nextSquare = document.getElementById(newID);
          boat.children[0].id = newID;
          nextSquare.parentNode.replaceChild(boat.children[0], nextSquare);
        } else {
          infoBox.textContent = "Boat cannot be placed there!";
          newBoatCoords = [];
          validBoat = false;
          boat.draggable = false;
          boat.draggable = true;
        }
      }
    }
  }
  if (
    newBoatCoords.some((coord) => neighbourCoords.includes(coord)) === false
  ) {
    playerBoard.newShip(newBoatCoords);
    renderPlayerBoats(playerBoard);
    if (playerBoard.occupied.length === 30) {
      playGame();
    }
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
    cSquares[i].removeEventListener("click", player.playerMove);
    if (
      cSquares[i].classList.contains("hit") === false &&
      cSquares[i].classList.contains("miss") === false
    ) {
      cSquares[i].addEventListener("click", player.playerMove);
    }
  }
}

function removeSquareEventListeners() {
  const cSquares = document.getElementsByClassName("square cSquare");
  for (var i = 0; i < cSquares.length; i++) {
    cSquares[i].removeEventListener("click", player.playerMove);
  }
}

function infoPlayerMove() {
  if (infoBox.textContent !== "Computer is taking their turn.") {
    setTimeout(() => {
      infoBox.textContent = "Your move! Choose a square to attack.";
    }, 2000);
  } else {
    infoBox.textContent = "Your move! Choose a square to attack.";
  }
}

function infoComputerMove() {
  if (infoBox.textContent !== "Your move! Choose a square to attack.") {
    setTimeout(() => {
      infoBox.textContent = "Computer is taking their turn.";
    }, 2000);
  } else {
    infoBox.textContent = "Computer is taking their turn.";
  }
}

function infoPlayerWin() {
  winnerText.style.display = "block";
  infoBox.textContent = "All of Computer's ships have been sunk! You have won!";
}

function infoComputerWin() {
  infoBox.textContent = "Computer has sunk all your ships! You lose!";
}

function infoSunkBoat(playerName, shipCoordsArray) {
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
  infoPlayerWin,
  infoComputerWin,
  infoSunkBoat,
};
