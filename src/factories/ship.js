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
    shipCoords,
  };
};

export default ShipFactory;
