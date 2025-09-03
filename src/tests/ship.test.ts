import { ShipFactory } from "../factories/ship";

test("Ship receives a hit", () => {
  const ship = ShipFactory(["1,1", "2,1", "3,1", "4,1"]);
  ship.hit(1);
  const { shipCoords } = ship;
  expect(shipCoords).toStrictEqual(["1,1", "hit", "3,1", "4,1"]);
});
test("Ship gets sunk", () => {
  const ship = ShipFactory(["1,1", "2,1", "3,1", "4,1"]);
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  ship.hit(3);
  const result = ship.isSunk();
  expect(result).toBeTruthy();
  expect(ship.shipCoords).toStrictEqual(["hit", "hit", "hit", "hit"]);
});
test("Ship does not get sunk", () => {
  const ship = ShipFactory(["1,1", "2,1", "3,1", "4,1"]);
  ship.hit(0);
  const result = ship.isSunk();
  expect(result).toBeFalsy();
  expect(ship.shipCoords).toStrictEqual(["hit", "2,1", "3,1", "4,1"]);
});
