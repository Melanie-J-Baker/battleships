import { Game, player, playerBoard, playGame } from "./index";
import { neighbourCoords } from "./factories/gameboard";
import { Gameboard } from "./types/gameboard";
import { Player } from "./types/player";

const playerGrid = document.getElementById("playerGrid") as HTMLDivElement;
const playerHeader = document.getElementById("playerHeader") as HTMLElement;
const computerGrid = document.getElementById("computerGrid") as HTMLDivElement;
const computerHeader = document.getElementById("computerHeader") as HTMLElement;
const start = document.getElementById("start") as HTMLButtonElement;
const heading = document.querySelector("h1") as HTMLHeadingElement;
const infoBox = document.getElementById("info") as HTMLDivElement;
const displayDiv = document.createElement("div") as HTMLDivElement;
const winnerText = document.getElementById("winner") as HTMLDivElement;

function createPlayerGrid(player: Player) {
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
function createComputerGrid(player: Player) {
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
  const boats = document.getElementsByClassName(
    "boat",
  ) as HTMLCollectionOf<HTMLDivElement>;
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
function dragstartHandler(e: DragEvent): void {
  const target = e.target as HTMLElement;
  if (e.dataTransfer) {
    e.dataTransfer.setData("text", target.id);
    e.dataTransfer.setData(
      "text/class",
      Array.from(target.classList).toString(),
    );
  }
  infoBox.textContent = "Place your ships on the grid. Click to rotate ship";
}

function dragoverHandler(e: DragEvent): void {
  e.preventDefault();
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = "move";
  }
}

function dropHandler(e: DragEvent): void {
  e.preventDefault();

  if (!e.dataTransfer) return;

  const target = e.target as HTMLElement;
  const movedID = e.dataTransfer.getData("text");
  const movedClass = e.dataTransfer.getData("text/class");

  const boat = document.getElementById(movedID) as HTMLDivElement | null;
  if (!boat) return;

  const length = boat.children.length;
  const startCoord = target.id.slice(1);
  const [xStr, yStr] = startCoord.split(",");
  const startX = parseInt(xStr, 10);
  const startY = parseInt(yStr, 10);

  const isVertical = movedClass.includes("vertical");
  const newBoatCoords: string[] = [];

  // Try to place each boat part
  for (let i = 0; i < length; i++) {
    const newX = isVertical ? startX + i : startX;
    const newY = isVertical ? startY : startY + i;
    const newCoord = `${newX},${newY}`;
    const newID = `p${newCoord}`;

    if (
      checkAvailable(playerBoard, newID) &&
      !neighbourCoords.includes(newCoord)
    ) {
      newBoatCoords.push(newCoord);

      const nextSquare = document.getElementById(
        newID,
      ) as HTMLDivElement | null;
      if (nextSquare?.parentNode) {
        boat.children[0].id = newID;
        nextSquare.parentNode.replaceChild(boat.children[0], nextSquare);
      }
    } else {
      infoBox.textContent = "Boat cannot be placed there!";
      // reset draggable state to allow retry
      boat.draggable = false;
      boat.draggable = true;
      return;
    }
  }

  // Finalize placement
  if (
    newBoatCoords.length > 0 &&
    !newBoatCoords.some((coord) => neighbourCoords.includes(coord))
  ) {
    playerBoard.newShip(newBoatCoords);
    renderPlayerBoats(playerBoard);

    if (playerBoard.occupied.length === 30) {
      playGame();
    }
  } else {
    infoBox.textContent = "Boat cannot be placed there!";
    boat.draggable = false;
    boat.draggable = true;
  }
}

function checkAvailable(board: Gameboard, target: string): boolean {
  if (board.occupied.includes(target)) {
    return false;
  } else {
    return true;
  }
}
function renderPlayerBoats(playerBoard: Gameboard): void {
  const playerGrid = document.getElementById("playerGrid") as HTMLDivElement;
  const playerSquares = playerGrid.children;
  for (let i = 0; i < playerSquares.length; i++) {
    let gridCoord = playerSquares[i].id.slice(1);
    if (playerBoard.occupied.includes(gridCoord)) {
      playerSquares[i].className = "square pSquare occupied";
    }
  }
}
function renderComputerBoard(computerBoard: Gameboard): void {
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
function renderPlayerBoard(playerBoard: Gameboard): void {
  const pSquares = document.getElementsByClassName("square pSquare");
  for (let i = 0; i < pSquares.length; i++) {
    if (playerBoard.hits.includes(pSquares[i].id.slice(1)) === true) {
      pSquares[i].className = "square pSquare hit";
    } else if (playerBoard.misses.includes(pSquares[i].id.slice(1)) === true) {
      pSquares[i].className = "square pSquare miss";
    }
  }
}
function addSquareEventListeners(): void {
  const cSquares = document.getElementsByClassName(
    "square cSquare",
  ) as HTMLCollectionOf<HTMLDivElement>;
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
function removeSquareEventListeners(): void {
  const cSquares = document.getElementsByClassName(
    "square cSquare",
  ) as HTMLCollectionOf<HTMLDivElement>;
  for (var i = 0; i < cSquares.length; i++) {
    cSquares[i].removeEventListener("click", player.playerMove);
  }
}
function infoPlayerMove(): void {
  if (infoBox.textContent !== "Computer is taking their turn.") {
    setTimeout(() => {
      infoBox.textContent = "Your move! Choose a square to attack.";
    }, 2000);
  } else {
    infoBox.textContent = "Your move! Choose a square to attack.";
  }
}
function infoComputerMove(): void {
  if (infoBox.textContent !== "Your move! Choose a square to attack.") {
    setTimeout(() => {
      infoBox.textContent = "Computer is taking their turn.";
    }, 2000);
  } else {
    infoBox.textContent = "Computer is taking their turn.";
  }
}
function infoPlayerWin(): void {
  winnerText.style.display = "block";
  infoBox.textContent = "All of Computer's ships have been sunk! You have won!";
}
function infoComputerWin(): void {
  infoBox.textContent = "Computer has sunk all your ships! You lose!";
}
function infoSunkBoat(
  playerName: string,
  shipCoordsArray: { shipCoords: string[] },
): void {
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
