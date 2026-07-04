import Ship from "./shipClass.utility.js";
import { describe, test, expect, beforeEach } from "@jest/globals";
import * as ShipTypes from "./shipTypeClass.utility.js";

let ship;
let carrier;
let battleship;
let destroyer;
let submarine;
let patrolBoat;

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

describe("Ship types logic", () => {
  beforeEach(() => {
    carrier = new ShipTypes.Carrier();
    battleship = new ShipTypes.Battleship();
    destroyer = new ShipTypes.Destroyer();
    submarine = new ShipTypes.Submarine();
    patrolBoat = new ShipTypes.PatrolBoat();
  });

  test("Different shiptypes return the correct length", () => {
    expect(carrier.length).toBe(5);
    expect(battleship.length).toBe(4);
    expect(destroyer.length).toBe(3);
    expect(submarine.length).toBe(3);
    expect(patrolBoat.length).toBe(2);
  });

  test("Different shiptypes return different isSunk() values for different number of hits", () => {
    carrier.hit();
    carrier.hit();
    battleship.hit();
    battleship.hit();
    destroyer.hit();
    destroyer.hit();
    submarine.hit();
    submarine.hit();
    patrolBoat.hit();
    patrolBoat.hit();

    expect(carrier.isSunk()).toBe(false);
    expect(battleship.isSunk()).toBe(false);
    expect(destroyer.isSunk()).toBe(false);
    expect(submarine.isSunk()).toBe(false);
    expect(patrolBoat.isSunk()).toBe(true);
  });
});
