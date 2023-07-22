const allMoves = [
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
  "A6",
  "A7",
  "A8",
  "A9",
  "A10",
  "B1",
  "B2",
  "B3",
  "B4",
  "B5",
  "B6",
  "B7",
  "B8",
  "B9",
  "B10",
  "C1",
  "C2",
  "C3",
  "C4",
  "C5",
  "C6",
  "C7",
  "C8",
  "C9",
  "C10",
  "D1",
  "D2",
  "D3",
  "D4",
  "D5",
  "D6",
  "D7",
  "D8",
  "D9",
  "D10",
  "E1",
  "E2",
  "E3",
  "E4",
  "E5",
  "E6",
  "E7",
  "E8",
  "E9",
  "E10",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "G1",
  "G2",
  "G3",
  "G4",
  "G5",
  "G6",
  "G7",
  "G8",
  "G9",
  "G10",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "H7",
  "H8",
  "H9",
  "H10",
  "I1",
  "I2",
  "I3",
  "I4",
  "I5",
  "I6",
  "I7",
  "I8",
  "I9",
  "I10",
  "J1",
  "J2",
  "J3",
  "J4",
  "J5",
  "J6",
  "J7",
  "J8",
  "J9",
  "J10",
];
const create2dArray = () => {
  let array2d = [];
  let counter = 0;
  for (let i = 0; i < 100 / 10; i++) {
    array2d.push([]);
    for (let j = 0; j < 10 && counter < 100; j++) {
      array2d[i].push(counter);
      counter++;
    }
  }
  return array2d;
};

const findNeighbours = (index, array2d) => {
  const rowIndex = parseInt(index / 10);
  const columnIndex = array2d[rowIndex].findIndex((c) => c === index);
  // right neighbour
  const right = array2d[rowIndex][columnIndex + 1];
  const left = array2d[rowIndex][columnIndex - 1];
  const top = array2d[rowIndex - 1]?.[columnIndex];
  const bottom = array2d[rowIndex + 1]?.[columnIndex];
  const neighbours = { right, left, bottom, top };
  return neighbours;
};

const randomIndex = () => {
  return Math.floor(Math.random() * 100);
};

const shipsArray = [
  ["", "", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
  ["", ""],
  ["", ""],
  ["", ""],
  ["", ""],
];
export { allMoves, create2dArray, findNeighbours, randomIndex, shipsArray };

//TAKEN FROM INDEX:
/*import {
  allMoves,
  create2dArray,
  findNeighbours,
  randomIndex,
  shipsArray,
} from "./helper";*/

//const array2d = create2dArray();
//const newCoords = [];

/*for (let i = 0; i < shipsArray.length; i++) {
    for (let j = 0; j < shipsArray[i].length; j++) {
      if (j === shipsArray[i][0]) {
        createRandomShipSquare(playerBoard);
      } else if (j == shipsArray[i][1]) {
        createRandomNeighbourSquare(playerBoard);
      } else {
        //directionOfNeighbour(newCoords[?]);
      }
    }
  }

  function createRandomShipSquare(board) {
    let coord1;
    let index = randomIndex();
    let coords = allMoves[index];
    let neighbours = findNeighbours(index, array2d);

    if (board.occupied.includes(coords)) {
      createRandomShipSquare(board);
    } else {
      for (let neighbour in neighbours) {
        if (board.occupied.includes(neighbour) === false && coord1 === undefined) {
          coord1 = coords
          console.log(coord1);
          newCoords.push(coord1);
          board.occupied.push(coord1);
          console.log(newCoords);
        } else {
          createRandomShipSquare(board)
        }
      }
    }
  }

  function createRandomNeighbourSquare(board) {
    const neighbours = findNeighbours(newCoords.length-1, array2d);
    const indexes = Object.values(neighbours);
    indexes.filter(removeOffGrid);
    //
    let index = indexes[Math.floor(Math.random() * indexes.length)];
    let coord2 = allMoves[index];
    if (board.occupied.includes(coord2)) {
      createRandomNeighbourSquare(board);
    } else {
      newCoords.push(coord2);
      board.occupied.push(coord2);
      console.log(newCoords);
    }
  }

function removeOffGrid(value, index, arr) {
    if (value === undefined) {
    // Removes the value from the original array
        arr.splice(index, 1);
        return true;
    }
    return false;
}

  function directionOfNeighbour(coord) {
    let index = allMoves.indexOf(coord);
    let neighbours = findNeighbours(index, array2d);

  }*/
