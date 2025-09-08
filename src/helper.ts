// Return all 8 surrounding coordinates around (x, y)
export const findNeighbours = (
  x: number,
  y: number,
): {
  right?: string;
  left?: string;
  top?: string;
  bottom?: string;
  topleft?: string;
  topright?: string;
  bottomleft?: string;
  bottomright?: string;
} => {
  const neighbours: { [key: string]: string | undefined } = {};

  // right
  if (x < 10) neighbours.right = `${x + 1},${y}`;
  // left
  if (x > 1) neighbours.left = `${x - 1},${y}`;
  // top
  if (y > 1) neighbours.top = `${x},${y - 1}`;
  // bottom
  if (y < 10) neighbours.bottom = `${x},${y + 1}`;
  // diagonals
  if (x > 1 && y > 1) neighbours.topleft = `${x - 1},${y - 1}`;
  if (x < 10 && y > 1) neighbours.topright = `${x + 1},${y - 1}`;
  if (x > 1 && y < 10) neighbours.bottomleft = `${x - 1},${y + 1}`;
  if (x < 10 && y < 10) neighbours.bottomright = `${x + 1},${y + 1}`;

  return neighbours;
};
