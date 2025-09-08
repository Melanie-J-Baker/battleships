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
  const { infoBox } = getDOMElements();
  const boats = document.getElementsByClassName(
    "boat",
  ) as HTMLCollectionOf<HTMLDivElement>;

  for (let i = 0; i < boats.length; i++) {
    const boat = boats[i];
    const firstChild = boat.firstElementChild as HTMLDivElement | null;

    // Only allow dragging from first square
    if (firstChild) {
      firstChild.draggable = true;
      firstChild.addEventListener("dragstart", (e) => {
        if (infoBox)
          infoBox.textContent =
            "Place your ships on the grid. Click to rotate ship";
        if (e.dataTransfer) {
          e.dataTransfer.setData("text", boat.id);
          e.dataTransfer.setData(
            "text/class",
            Array.from(boat.classList).toString(),
          );
          e.dataTransfer.setDragImage(boat, 0, 0);
        }
      });
    }
    boat.draggable = false;
    boat.addEventListener("click", () => {
      boat.classList.toggle("vertical");
    });
    if (infoBox)
      infoBox.textContent =
        "Place your ships on the grid. Click to rotate ship";
  }
}

function dragoverHandler(e: DragEvent): void {
  e.preventDefault();
  if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
}

function dropHandler(
  e: DragEvent,
  playerBoard: Gameboard,
  player: Player,
  computer: Player,
  computerBoard: Gameboard,
): string[] | null {
  e.preventDefault();
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
  for (let i = 0; i < length; i++) {
    const x = isVertical ? startX + i : startX;
    const y = isVertical ? startY : startY + i;
    coords.push(`${x},${y}`);
  }

  const placed = finalizeBoatPlacement(
    playerBoard,
    coords,
    player,
    computer,
    computerBoard,
  );

  return placed ? coords : null;
}

export function renderPlayerBoats(playerBoard: Gameboard): void {
  const { playerGrid } = getDOMElements();
  if (!playerGrid) return;

  const squares = playerGrid.children;
  for (let i = 0; i < squares.length; i++) {
    const div = squares[i] as HTMLDivElement;
    const coord = div.id.slice(1);

    // Reset state first
    div.className = "square pSquare";

    // Mark occupied/hit/miss from board state
    if (playerBoard.hits.includes(coord)) {
      div.classList.add("hit");
    } else if (playerBoard.misses.includes(coord)) {
      div.classList.add("miss");
    } else if (playerBoard.occupied.includes(coord)) {
      div.classList.add("occupied");
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

  // Check within grid
  const domValid = coords.every((coord) =>
    document.getElementById("p" + coord),
  );
  if (!domValid) {
    if (infoBox) infoBox.textContent = "Boat cannot be placed there!";
    return false;
  }

  // Check overlap + touching
  const allNeighbours: string[] = [];
  for (const c of coords) {
    const [xStr, yStr] = c.split(",");
    const x = parseInt(xStr, 10);
    const y = parseInt(yStr, 10);
    const neighbours = findNeighbours(x, y);
    allNeighbours.push(
      ...(Object.values(neighbours).filter(Boolean) as string[]),
    );
  }
  const overlap = coords.some((c) => occupied.has(c));
  const touching = allNeighbours.some((n) => occupied.has(n));
  if (overlap || touching) {
    if (infoBox) infoBox.textContent = "Boat cannot be placed there!";
    return false;
  }

  // Commit placement
  playerBoard.newShip(coords);
  renderPlayerBoats(playerBoard);

  if (playerBoard.occupied.length === 30) {
    if (infoBox)
      infoBox.textContent = "All ships placed! Let the battle begin!";
    startBattle(player, computer, playerBoard, computerBoard);
  }

  return true;
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
