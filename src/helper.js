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
export { create2dArray, findNeighbours, randomIndex, shipsArray };

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

  }

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
