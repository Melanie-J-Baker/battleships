const findNeighbours = (index) => {
  let array2d = [];
  let counter = 0;
  for (let i = 0; i < 100 / 10; i++) {
    array2d.push([]);
    for (let j = 0; j < 10 && counter < 100; j++) {
      array2d[i].push(counter);
      counter++;
    }
  }
  const rowIndex = parseInt(index / 10);
  const columnIndex = array2d[rowIndex].findIndex((c) => c === index);
  const right = array2d[rowIndex][columnIndex + 1];
  const left = array2d[rowIndex][columnIndex - 1];
  const top = array2d[rowIndex - 1]?.[columnIndex];
  const bottom = array2d[rowIndex + 1]?.[columnIndex];
  const topleft = array2d[rowIndex - 1]?.[columnIndex - 1];
  const topright = array2d[rowIndex - 1]?.[columnIndex + 1];
  const bottomleft = array2d[rowIndex + 1]?.[columnIndex - 1];
  const bottomright = array2d[rowIndex + 1]?.[columnIndex + 1];
  const neighbours = {
    right,
    left,
    top,
    bottom,
    topleft,
    topright,
    bottomleft,
    bottomright,
  };
  return neighbours;
};

export default findNeighbours;
