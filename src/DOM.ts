import { initGame } from "./index";
import { findNeighbours } from "./helper";
import { Gameboard } from "./types/gameboard";
import { Player } from "./types/player";

// Helper function to return class name based on ship type
function shipClass(type: string): string {
  switch (type) {
    case "C":
      return "carrier";
    case "B":
      return "battleship";
    case "D":
      return "destroyer";
    case "P":
      return "patrolboat";
    default:
      return "";
  }
}

export function getDOMElements() {
  return {
    playerGrid: document.getElementById("playerGrid") as HTMLDivElement,
    playerHeader: document.getElementById("playerHeader") as HTMLElement,
    computerGrid: document.getElementById("computerGrid") as HTMLDivElement,
    computerHeader: document.getElementById("computerHeader") as HTMLElement,
    start: document.getElementById("start") as HTMLButtonElement,
    heading: document.querySelector("h1") as HTMLHeadingElement,
    infoBox: document.getElementById("info") as HTMLDivElement,
    winnerText: document.getElementById("winner") as HTMLDivElement,
  };
}

export function createPlayerGrid(player: Player) {
  const { playerGrid, playerHeader } = getDOMElements();
  if (!playerGrid || !playerHeader) return;
  playerGrid.innerHTML = "";
  for (let i = 0; i < 100; i++) {
    let playerSquare = document.createElement("div");
    playerSquare.className = "square pSquare";
    playerSquare.id = "p" + `${player.availableMoves[i]}`;
    playerSquare.addEventListener("dragover", dragoverHandler);
    playerSquare.addEventListener("drop", (e) => dropHandler(e));
    playerGrid.appendChild(playerSquare);
  }
  playerHeader.textContent = "Player";
}

export function createComputerGrid(player: Player) {
  const { computerGrid, computerHeader } = getDOMElements();
  if (!computerGrid || !computerHeader) return;
  computerGrid.innerHTML = "";
  for (let i = 0; i < 100; i++) {
    let computerSquare = document.createElement("div");
    computerSquare.className = "square cSquare";
    computerSquare.id = "c" + `${player.availableMoves[i]}`;
    computerGrid.appendChild(computerSquare);
  }
  computerHeader.textContent = "Computer";
}

export function startEventListener() {
  const { start, heading, infoBox } = getDOMElements();
  start.addEventListener("click", function () {
    if (start.textContent === "Start Game") {
      start.textContent = "Restart Game";
      heading.classList.remove("large");
      infoBox.style.display = "block";
      initGame();
    } else {
      window.location.reload();
    }
  });
}

export function renderMovableBoats(player: Player): void {
  const { infoBox, computerGrid } = getDOMElements();
  if (!computerGrid || !infoBox) return;
  let displayDiv = document.getElementById(
    "boatsDisplay",
  ) as HTMLDivElement | null;
  if (!displayDiv) {
    displayDiv = document.createElement("div");
    displayDiv.id = "boatsDisplay";
    computerGrid.appendChild(displayDiv);
  } else {
    displayDiv.innerHTML = "";
  }
  computerGrid.className = "";
  createPlayerGrid(player);

  infoBox.textContent = "Place your ships on the grid. Click to rotate ship";

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

  for (let i = 0; i < shipSizeArray.length; i++) {
    const boat = document.createElement("div") as HTMLDivElement;
    const type = shipSizeArray[i][0];
    boat.className = `boat ${shipClass(type)}`;
    boat.id = `${shipClass(type)}${i}`;

    for (let j = 0; j < shipSizeArray[i].length; j++) {
      const boatSquare = document.createElement("div");
      boatSquare.className = `boatSquare ${shipClass(type)}Square`;
      boatSquare.draggable = false;
      boat.appendChild(boatSquare);
    }
    displayDiv.appendChild(boat);
  }
}

// Add event listeners to boats for dragging and rotating
export function addBoatEventListeners(): void {
  const boats = document.getElementsByClassName(
    "boat",
  ) as HTMLCollectionOf<HTMLDivElement>;
  for (let i = 0; i < boats.length; i++) {
    const boat = boats[i];
    boat.draggable = true;
    boat.addEventListener("dragstart", dragstartHandler);
    boat.addEventListener("click", () => {
      boat.classList.toggle("vertical");
    });
  }
}

// Drag and drop for boat placement
function dragstartHandler(e: DragEvent): void {
  const { infoBox } = getDOMElements();
  const target = e.target as HTMLElement;
  if (e.dataTransfer) {
    e.dataTransfer.setData("text", target.id);
    e.dataTransfer.setData(
      "text/class",
      Array.from(target.classList).toString(),
    );
  }
  if (infoBox)
    infoBox.textContent = "Place your ships on the grid. Click to rotate ship";
}

function dragoverHandler(e: DragEvent): void {
  e.preventDefault();
  if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
}

// Drop handler that attempts DOM placement of boat and returns coords so caller can validate and commit to a board
function dropHandler(e: DragEvent): string[] | null {
  e.preventDefault();
  const { infoBox } = getDOMElements();
  if (!e.dataTransfer) return null;

  const target = e.target as HTMLElement;
  const boatID = e.dataTransfer.getData("text");
  const boatClass = e.dataTransfer.getData("text/class");

  const boat = document.getElementById(boatID) as HTMLDivElement | null;
  if (!boat || !target?.id?.startsWith("p")) return null;

  const length = boat.children.length;
  const [xStr, yStr] = target.id.slice(1).split(",");
  const startX = parseInt(xStr, 10);
  const startY = parseInt(yStr, 10);
  const isVertical = boatClass.includes("vertical");

  const coords: string[] = [];

  // Try to place each boat part
  for (let i = 0; i < length; i++) {
    const x = isVertical ? startX + i : startX;
    const y = isVertical ? startY : startY + i;
    const coord = `${x},${y}`;
    const newID = `p${coord}`;

    const nextSquare = document.getElementById(newID) as HTMLDivElement | null;
    if (nextSquare?.parentNode) {
      // move one block of boat into place
      (boat.children[0] as HTMLElement).id = newID;
      nextSquare.parentNode.replaceChild(boat.children[0], nextSquare);
    } else {
      if (infoBox) infoBox.textContent = "Boat cannot be placed there!";
      boat.draggable = false;
      boat.draggable = true;
      return null;
    }
  }
  return coords;
}

export function finalizeBoatPlacement(
  playerBoard: Gameboard,
  coords: string[],
): boolean {
  const { infoBox } = getDOMElements();
  const neighbourCoords = findNeighbours(parseInt(coords[0]));
  if (
    coords.length > 0 &&
    !coords.some(
      (c) =>
        Object.values(neighbourCoords).includes(parseInt(c)) &&
        coords.every((c) => !playerBoard.occupied.includes(c)),
    )
  ) {
    playerBoard.newShip(coords);
    renderPlayerBoats(playerBoard);
    return true;
  } else {
    playerBoard.occupied = playerBoard.occupied.filter(
      (coord) => !coords.includes(coord),
    );
    if (infoBox) infoBox.textContent = "Boat cannot be placed there!";
    return false;
  }
}

// Rendering
export function renderPlayerBoats(playerBoard: Gameboard): void {
  const { playerGrid } = getDOMElements();
  if (!playerGrid) return;

  const squares = playerGrid.children;
  for (let i = 0; i < squares.length; i++) {
    const div = squares[i] as HTMLDivElement;
    const coord = div.id.slice(1);
    if (playerBoard.occupied.includes(coord)) {
      div.className = "square pSquare occupied";
    }
  }
}

export function renderComputerBoard(computerBoard: Gameboard): void {
  const squares = document.getElementsByClassName(
    "square cSquare",
  ) as HTMLCollectionOf<HTMLDivElement>;
  for (let i = 0; i < squares.length; i++) {
    const coord = squares[i].id.slice(1);
    if (computerBoard.hits.includes(coord))
      squares[i].className = "square cSquare hit";
    else if (computerBoard.misses.includes(coord))
      squares[i].className = "square cSquare miss";
  }
}

export function renderPlayerBoard(playerBoard: Gameboard): void {
  const squares = document.getElementsByClassName(
    "square pSquare",
  ) as HTMLCollectionOf<HTMLDivElement>;
  for (let i = 0; i < squares.length; i++) {
    const coord = squares[i].id.slice(1);
    if (playerBoard.hits.includes(coord))
      squares[i].className = "square pSquare hit";
    else if (playerBoard.misses.includes(coord))
      squares[i].className = "square pSquare miss";
    else if (playerBoard.occupied.includes(coord))
      squares[i].className = "square pSquare occupied";
  }
}

// Event listener management for computer grid squares
export function addSquareEventListeners(
  playerClickHandler: (e: MouseEvent) => void,
): void {
  const squares = document.getElementsByClassName(
    "square cSquare",
  ) as HTMLCollectionOf<HTMLDivElement>;
  for (var i = 0; i < squares.length; i++) {
    squares[i].removeEventListener("click", playerClickHandler);
    if (
      !squares[i].classList.contains("hit") &&
      !squares[i].classList.contains("miss")
    ) {
      squares[i].addEventListener("click", playerClickHandler);
    }
  }
}

// Info helpers
export function infoPlayerMove(): void {
  const { infoBox } = getDOMElements();
  if (!infoBox) return;
  infoBox.textContent = "Your move! Choose a square to attack.";
}

export function infoComputerMove(): void {
  const { infoBox } = getDOMElements();
  if (!infoBox) return;
  infoBox.textContent = "Computer is taking their turn.";
}

export function infoPlayerWin(): void {
  const { infoBox, winnerText } = getDOMElements();
  if (infoBox)
    infoBox.textContent = "All of Computer's ships have been sunk! You win!";
  if (winnerText) winnerText.style.display = "block";
}

export function infoComputerWin(): void {
  const { infoBox } = getDOMElements();
  infoBox.textContent = "Computer has sunk all your ships! You lose!";
}

export function infoSunkBoat(
  playerName: string,
  shipCoordsArray: { shipCoords: string[] },
): void {
  const { infoBox } = getDOMElements();
  if (!infoBox) return;
  let len = shipCoordsArray.shipCoords.length;
  const label =
    len === 5
      ? "Carrier"
      : len === 4
      ? "Battleship"
      : len === 3
      ? "Destroyer"
      : len === 2
      ? "Patrol boat"
      : "Ship";
  infoBox.textContent = `${playerName}'s ${label} sunk!`;
}
