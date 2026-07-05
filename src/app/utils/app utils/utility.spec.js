import Ship from "./shipClass.utility.js";
import { describe, test, expect, beforeEach } from "@jest/globals";
import * as shipTypes from "./shipTypeClass.utility.js";
import boardPopulator from "./boardPopulator.utility.js";
import GameBoard from "./gameBoard.utility.js";

let ship;
let carrier;
let battleship;
let destroyer;
let submarine;
let patrolBoat;
let populatedBoard;
let board;

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
    carrier = new shipTypes.Carrier();
    battleship = new shipTypes.Battleship();
    destroyer = new shipTypes.Destroyer();
    submarine = new shipTypes.Submarine();
    patrolBoat = new shipTypes.PatrolBoat();
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

describe("Board populator logic", () => {
  beforeEach(() => {
    populatedBoard = boardPopulator();
  });

  test("board populator populates the board with 100 unoccupied and unshot coordinates", () => {
    expect(populatedBoard[49]).toEqual({
      x: "E",
      y: 10,
    });
    expect(populatedBoard[79]).toEqual({
      x: "H",
      y: 10,
    });
    expect(populatedBoard[63]).toEqual({
      x: "G",
      y: 4,
    });
  });

  test("board populator is able to change occupied states", () => {
    let grid = populatedBoard[5];
    grid.occupy();
    expect(grid.occupied).toBe(true);
  });

  test("board populator is able to change shot states", () => {
    let grid = populatedBoard[5];
    grid.shoot();
    expect(grid.shot).toBe(true);
  });

  test("board populator throws when occupy() runs on an already occupied grid.", () => {
    let grid = populatedBoard[0];
    grid.occupy();
    expect(() => {
      grid.occupy();
    }).toThrow;
  });

  test("board populator throws when shoot() runs on an already shot grid.", () => {
    let grid = populatedBoard[0];
    grid.shoot();
    expect(() => {
      grid.shoot();
    }).toThrow;
  });
});

describe("GameBoard logic", () => {
  beforeEach(() => {
    board = new GameBoard();
  });

  test("gameBoard instantiates with the gameboard property containing the populated board", () => {
    expect(Object.hasOwn(board, "gameBoard")).toBe(true);
  });

  test("gameBoard's board is accessible from the public interface and can return values", () => {
    expect(board.gameBoard[0]).toEqual({
      x: "A",
      y: 1,
    });
  });
});
