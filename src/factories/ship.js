// 1. Ship factory function.
// a) Your ships will be objects that include their length, the number of times theyve been hit and whether or not theyve been sunk.
// b) REMEMBER you only have to test your objects public interface. Only methods or properties that are used outside of your ship object need unit tests.

const ShipFactory = function (coords) {
  const shipCoords = [];
  coords.map((coord) => {
    return shipCoords.push(coord);
  });

  function hit(index) {
    shipCoords[index] = "hit";
  }
  function isSunk() {
    return shipCoords.every((coord) => coord === "hit");
  }
  return {
    hit,
    isSunk,
    coords,
    shipCoords,
  };
};

export default ShipFactory;
