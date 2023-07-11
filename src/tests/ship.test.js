// 1. Begin your app by creating the Ship factory function.
// a) Your ships will be objects that include their length, the number of times theyve been hit and whether or not theyve been sunk.
// b) REMEMBER you only have to test your objects public interface. Only methods or properties that are used outside of your ship object need unit tests.
// c) Ships should have a hit() function that increases the number of hits in your ship.
// d) isSunk() should be a function that calculates it based on their length and the number of hits.
import ShipFactory from "../factories/ship";

test("Ship receives a hit", () => {
  const ship = ShipFactory(["A1", "B1", "C1", "D1"]);
  ship.hit(1);
  const { shipCoords } = ship;

  expect(shipCoords).toStrictEqual(["A1", "hit", "C1", "D1"]);
});

test("Ship gets sunk", () => {
  const ship = ShipFactory(["A1", "B1", "C1", "D1"]);
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  ship.hit(3);
  const result = ship.isSunk();

  expect(result).toBeTruthy();
  expect(ship.shipCoords).toStrictEqual(["hit", "hit", "hit", "hit"]);
});

test("Ship does not get sunk", () => {
  const ship = ShipFactory(["A1", "B1", "C1", "D1"]);
  ship.hit(0);
  const result = ship.isSunk();

  expect(result).toBeFalsy();
  expect(ship.shipCoords).toStrictEqual(["hit", "B1", "C1", "D1"]);
});
