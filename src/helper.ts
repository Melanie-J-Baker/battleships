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
  const inBounds = (x: number, y: number) =>
    x >= 1 && x <= 10 && y >= 1 && y <= 10 ? `${x},${y}` : undefined;

  return {
    right: inBounds(x, y + 1),
    left: inBounds(x, y - 1),
    top: inBounds(x - 1, y),
    bottom: inBounds(x + 1, y),
    topleft: inBounds(x - 1, y - 1),
    topright: inBounds(x - 1, y + 1),
    bottomleft: inBounds(x + 1, y - 1),
    bottomright: inBounds(x + 1, y + 1),
  };
};
