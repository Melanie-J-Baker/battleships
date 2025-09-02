import { Neighbours } from "./types/neighbours";

const findNeighbours = (index: number): Neighbours => {
  const array2d: number[][] = [];
  let counter = 0;

  for (let i = 0; i < 100 / 10; i++) {
    array2d.push([]);
    for (let j = 0; j < 10 && counter < 100; j++) {
      array2d[i].push(counter);
      counter++;
    }
  }
  const rowIndex = Math.floor(index / 10);
  const columnIndex = array2d[rowIndex].findIndex((c) => c === index);

  const right = array2d[rowIndex][columnIndex + 1];
  const left = array2d[rowIndex][columnIndex - 1];
  const top = array2d[rowIndex - 1]?.[columnIndex];
  const bottom = array2d[rowIndex + 1]?.[columnIndex];
  const topleft = array2d[rowIndex - 1]?.[columnIndex - 1];
  const topright = array2d[rowIndex - 1]?.[columnIndex + 1];
  const bottomleft = array2d[rowIndex + 1]?.[columnIndex - 1];
  const bottomright = array2d[rowIndex + 1]?.[columnIndex + 1];

  return {
    right,
    left,
    top,
    bottom,
    topleft,
    topright,
    bottomleft,
    bottomright,
  };
};
export default findNeighbours;
