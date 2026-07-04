import Ship from "./shipClass.utility.js";
import { describe, test, expect, beforeEach } from "@jest/globals";

let ship;

describe("Ship logic", () => {
  beforeEach(() => {
    ship = new Ship();
  });

  test.skip("Ship object instantiates with length, hits and sunk properties.", () => {
    expect(ship).toEqual({
      length: undefined,
      hasSunk: false,
      hits: 0,
    });
  });

  test("length sets and gets the length of the ship respectively", () => {
    ship.length = 5;
    expect(ship.length).toBe(5);
  });

  test("hits returns the number of hits the ship currently has", () => {
    expect(ship.hits).toBe(0);
  });

  test("hit() increases the number of hits on the ship", () => {
    ship.hit();
    expect(ship.hits).toEqual(1);
  });

  test("isSunk() returns true when the number of hits and the length of the ship are equal", () => {
    ship.length = 2;
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("isSunk() returns false when the number of hits is less than the length of the ship", () => {
    ship.length = 5;
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
});
