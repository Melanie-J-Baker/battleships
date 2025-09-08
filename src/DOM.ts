import { initGame, startBattle } from "./index";
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

export function createPlayerGrid(
  player: Player,
  playerBoard: Gameboard,
  computer: Player,
  computerBoard: Gameboard,
) {
  const { playerGrid, playerHeader } = getDOMElements();
  if (!playerGrid || !playerHeader) return;
  playerGrid.innerHTML = "";
  for (let i = 0; i < 100; i++) {
    let playerSquare = document.createElement("div");
    playerSquare.className = "square pSquare";
    playerSquare.id = "p" + `${player.availableMoves[i]}`;
    playerSquare.addEventListener("dragover", dragoverHandler);
    playerSquare.addEventListener("drop", (e) =>
      dropHandler(e, playerBoard, player, computer, computerBoard),
    );
    playerGrid.appendChild(playerSquare);
  }
  playerHeader.textContent = "Player";
}

export function startEventListener() {
  const { start, heading, infoBox } = getDOMElements();
  if (start)
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

export function renderMovableBoats(
  player: Player,
  playerBoard: Gameboard,
  computer: Player,
  computerBoard: Gameboard,
): void {
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
  createPlayerGrid(player, playerBoard, computer, computerBoard);

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
function dropHandler(
  e: DragEvent,
  playerBoard: Gameboard,
  player: Player,
  computer: Player,
  computerBoard: Gameboard,
): string[] | null {
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

  // Collect all target coordinates
  for (let i = 0; i < length; i++) {
    const x = isVertical ? startX + i : startX;
    const y = isVertical ? startY : startY + i;
    coords.push(`${x},${y}`);
  }

  // Check all target coordinate are within grid and available
  const valid = coords.every((coord) => {
    const square = document.getElementById("p" + coord) as HTMLDivElement;
    return square !== null && !square.classList.contains("occupied");
  });

  if (!valid) {
    if (infoBox) infoBox.textContent = "Boat cannot be placed there!";
    return null;
  }

  // Place boat on grid if valid
  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i];
    const nextSquare = document.getElementById("p" + coord) as HTMLDivElement;
    (boat.children[0] as HTMLElement).id = "p" + coord; // Update id for testing
    nextSquare.parentNode?.replaceChild(boat.children[0], nextSquare);
  }

  finalizeBoatPlacement(playerBoard, coords, player, computer, computerBoard);
  return coords;
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

export function finalizeBoatPlacement(
  playerBoard: Gameboard,
  coords: string[],
  player: Player,
  computer: Player,
  computerBoard: Gameboard,
): boolean {
  const { infoBox } = getDOMElements();
  const occupied = new Set(playerBoard.occupied);

  // Find all neighbours of the proposed ship coordinates
  const allNeighbours: string[] = [];
  for (const c of coords) {
    const [xStr, yStr] = c.split(",");
    const x = parseInt(xStr, 10);
    const y = parseInt(yStr, 10);
    const neighbours = findNeighbours(x, y);
    allNeighbours.push(
      ...(Object.values(neighbours).filter(Boolean) as string[]),
    ); // filter undefined neighbours
  }

  // Check if overlap or touching
  const overlap = coords.some((c) => occupied.has(c)); // overlap existing ship
  const touching = allNeighbours.some((n) => occupied.has(n)); // touching another ship
  const invalid = overlap || touching;

  if (!invalid) {
    // Place ship
    playerBoard.newShip(coords);
    renderPlayerBoats(playerBoard);

    // Check if all boats placed
    if (playerBoard.occupied.length === 30) {
      if (infoBox)
        infoBox.textContent = "All ships placed! Let the battle begin!";
      startBattle(player, computer, playerBoard, computerBoard);
    }
    return true;
  } else {
    if (infoBox) infoBox.textContent = "Boat cannot be placed there!";
    return false;
  }
}

export function createComputerGrid(player: Player, computerBoard: Gameboard) {
  const { computerGrid, computerHeader } = getDOMElements();
  if (!computerGrid || !computerHeader) return;
  computerGrid.innerHTML = "";
  computerGrid.className = "grid";
  for (let i = 0; i < 100; i++) {
    let computerSquare = document.createElement("div");
    computerSquare.className = "square cSquare";
    computerSquare.id = "c" + `${player.availableMoves[i]}`;
    computerGrid.appendChild(computerSquare);
  }
  computerHeader.textContent = "Computer";

  // Create computer's boats
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
