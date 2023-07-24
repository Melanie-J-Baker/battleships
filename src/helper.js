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

export { create2dArray, findNeighbours };
