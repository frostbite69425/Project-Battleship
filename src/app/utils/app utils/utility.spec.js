import Ship from "./shipClass.utility.js";
import { describe, test, expect, beforeEach } from "@jest/globals";
import * as shipTypes from "./shipTypeClass.utility.js";
import boardPopulator from "./boardPopulator.utility.js";
import GameBoard from "./gameBoard.utility.js";
import Player from "./player.utility.js";
import Game from "../../controllers/app controller/gameController.controller.js";
import randomiseSetup from "../../services/app services/randomiseSetup.service.js";

let ship;
let carrier;
let battleship;
let destroyer;
let submarine;
let patrolBoat;
let populatedBoard;
let board;
let human;
let computer;
let game;

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
  }); // properties made private.

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

  test("board populator is able to clear occupied grids", () => {
    let grid = populatedBoard[5];
    grid.occupy();
    expect(grid.occupied).toBe(true);
    grid.clearGrid();
    expect(grid.occupied).toBe(false);
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
    }).toThrow();
  });

  test("headNode() returns the headNode of the boardCoordinate", () => {
    let grid = populatedBoard[0];
    expect(grid.headNodeIndex).toBeNull();
  });

  test("headNode(x) sets the headNode of the boardCoordinate", () => {
    let grid = populatedBoard[0];
    grid.headNodeIndex = "test Grid";
    expect(grid.headNodeIndex).toBe("test Grid");
  });
});

describe("GameBoard logic", () => {
  beforeEach(() => {
    board = new GameBoard();
  });

  test("GameBoard instantiates with the gameboard property containing the populated board", () => {
    expect(Object.hasOwn(board, "gameBoard")).toBe(true);
  });

  test("GameBoard's board is accessible from the public interface and can return values", () => {
    expect(board.gameBoard[0]).toEqual({
      x: "A",
      y: 1,
    });
  });

  test("Gameboard does not allow duplicate ships to be placed", () => {
    board.placeShip("Carrier", ["A", 1], "horizontal");
    expect(() => {
      board.placeShip("Carrier", ["I", 1], "horizontal");
    }).toThrow();
  });

  test("Gameboard allows ships to be placed horizontally", () => {
    board.placeShip("Carrier", ["A", 1], "horizontal");
    board.placeShip("Submarine", ["B", 1], "horizontal");
    board.placeShip("PatrolBoat", ["C", 1], "vertical");
    board.placeShip("Destroyer", ["F", 1], "vertical");
    expect(board.gameBoard[0].occupied).toBe(true);
    expect(board.gameBoard[1].occupied).toBe(true);
    expect(board.gameBoard[2].occupied).toBe(true);
    expect(board.gameBoard[3].occupied).toBe(true);
    expect(board.gameBoard[4].occupied).toBe(true);
    expect(board.gameBoard[10].occupied).toBe(true);
    expect(board.gameBoard[60].occupied).toBe(true);
    expect(board.gameBoard[30].occupied).toBe(true);
  });

  test("Gameboard does not allow ships to be placed in an overlapping manner", () => {
    board.placeShip("Carrier", ["A", 1], "vertical");
    expect(() => {
      board.placeShip("Submarine", ["B", 1], "horizontal");
    }).toThrow();
  });

  test("Gameboard allows ships to be placed vertically", () => {
    board.placeShip("Carrier", ["A", 1], "vertical");
    expect(board.gameBoard[0].occupied).toBe(true);
    expect(board.gameBoard[10].occupied).toBe(true);
    expect(board.gameBoard[20].occupied).toBe(true);
    expect(board.gameBoard[30].occupied).toBe(true);
    expect(board.gameBoard[40].occupied).toBe(true);
    expect(board.gameBoard[90].occupied).toBe(false);
  });

  test("Gameboard throws when non existent ships are invoked", () => {
    expect(() => {
      board.placeShip("aslkhc", ["A", 1], "vertical");
    }).toThrow();
  });

  test("Gameboard throws when non existent orientations are invoked", () => {
    expect(() => {
      board.placeShip("aslkhc", ["A", 1], "diagonal");
    }).toThrow();
  });

  test("Gameboard throws when invalid start coordinates are used", () => {
    expect(() => {
      board.placeShip("Carrier", ["Z", 101], "vertical");
    }).toThrow();
  });

  test("Gameboard throws when overflowing start coordinates are used", () => {
    expect(() => {
      board.placeShip("Carrier", ["J", 10], "vertical");
    }).toThrow();
  });

  test("receiveAttack() takes a pair of coordinates and determines whether the attack hit a ship or if it missed", () => {
    board.placeShip("Carrier", ["A", 1], "vertical");
    board.receiveAttack(["A", 1]);
    expect(board.gameBoard[0].occupied).toBe(true);
    expect(board.gameBoard[0].shot).toBe(true);
    expect(board.gameBoard[10].occupied).toBe(true);
    expect(board.gameBoard[10].shot).toBe(false);
  });

  test("receiveAttack() sinks a ship if enough attacks are provided", () => {
    board.placeShip("PatrolBoat", ["A", 1], "vertical");
    board.receiveAttack(["A", 1]);
    expect(board.gameBoard[0].occupied).toBe(true);
    expect(board.gameBoard[0].shot).toBe(true);
    expect(board.gameBoard[0].ship.isSunk()).toBe(false);
    board.receiveAttack(["B", 1]);
    expect(board.gameBoard[10].occupied).toBe(true);
    expect(board.gameBoard[10].shot).toBe(true);
    expect(board.gameBoard[0].ship.isSunk()).toBe(true);
  });

  test("receiveAttack() throws when invalid pair of coordinates are provided", () => {
    board.placeShip("Carrier", ["A", 1], "vertical");
    expect(() => {
      board.receiveAttack(["A", 0]);
    }).toThrow();
    expect(board.gameBoard[0].occupied).toBe(true);
    expect(board.gameBoard[0].shot).toBe(false);
  });

  test("receiveAttack() throws if the same grid is attacked twice", () => {
    board.placeShip("Carrier", ["A", 1], "vertical");
    board.receiveAttack(["A", 1]);
    expect(() => {
      board.receiveAttack(["A", 1]);
    }).toThrow();
  });

  test("allSunk() returns true if all the ships have been sunk", () => {
    board.placeShip("PatrolBoat", ["A", 1], "vertical");
    board.placeShip("Submarine", ["A", 2], "vertical");
    board.receiveAttack(["A", 1]);
    board.receiveAttack(["A", 2]);
    board.receiveAttack(["B", 1]);
    board.receiveAttack(["B", 2]);
    expect(board.allSunk()).toBe(false);
    board.receiveAttack(["C", 2]);
    expect(board.allSunk()).toBe(true);
  });

  test("rotateShip() takes the headNode coordinate with a ship placed on it and switches the orientation from vertical to horizontal by rotating the ship around the headNode.", () => {
    board.placeShip("Carrier", ["A", 1], "vertical");
    board.rotateShip(["A", 1]);
    expect(board.gameBoard[0].occupied).toBe(true);
    expect(board.gameBoard[10].occupied).toBe(false);
    expect(board.gameBoard[20].occupied).toBe(false);
    expect(board.gameBoard[30].occupied).toBe(false);
    expect(board.gameBoard[40].occupied).toBe(false);
    expect(board.gameBoard[1].occupied).toBe(true);
    expect(board.gameBoard[2].occupied).toBe(true);
    expect(board.gameBoard[3].occupied).toBe(true);
    expect(board.gameBoard[4].occupied).toBe(true);
  });

  test("rotateShip() can take in any coordinate with a ship placed on it and switches the orientation from vertical to horizontal by rotating the ship around the headNode.", () => {
    board.placeShip("Carrier", ["A", 1], "vertical");
    board.rotateShip(["B", 1]);
    expect(board.gameBoard[0].occupied).toBe(true);
    expect(board.gameBoard[10].occupied).toBe(false);
    expect(board.gameBoard[20].occupied).toBe(false);
    expect(board.gameBoard[30].occupied).toBe(false);
    expect(board.gameBoard[40].occupied).toBe(false);
    expect(board.gameBoard[1].occupied).toBe(true);
    expect(board.gameBoard[2].occupied).toBe(true);
    expect(board.gameBoard[3].occupied).toBe(true);
    expect(board.gameBoard[4].occupied).toBe(true);
  });

  test("rotateShip() takes the headNode coordinate with a ship placed on it and switches the orientation from horizontal to vertical by rotating the ship around the headNode.", () => {
    board.placeShip("Carrier", ["A", 1], "horizontal");
    board.rotateShip(["A", 1]);
    expect(board.gameBoard[0].occupied).toBe(true);
    expect(board.gameBoard[20].occupied).toBe(true);
    expect(board.gameBoard[30].occupied).toBe(true);
    expect(board.gameBoard[10].occupied).toBe(true);
    expect(board.gameBoard[40].occupied).toBe(true);
    expect(board.gameBoard[1].occupied).toBe(false);
    expect(board.gameBoard[2].occupied).toBe(false);
    expect(board.gameBoard[3].occupied).toBe(false);
    expect(board.gameBoard[4].occupied).toBe(false);
  });

  test("rotateShip() can take in any coordinate with a ship placed on it and switches the orientation from horizontal to vertical by rotating the ship around the headNode.", () => {
    board.placeShip("Carrier", ["A", 1], "horizontal");
    board.rotateShip(["A", 3]);
    expect(board.gameBoard[0].occupied).toBe(true);
    expect(board.gameBoard[20].occupied).toBe(true);
    expect(board.gameBoard[30].occupied).toBe(true);
    expect(board.gameBoard[10].occupied).toBe(true);
    expect(board.gameBoard[40].occupied).toBe(true);
    expect(board.gameBoard[1].occupied).toBe(false);
    expect(board.gameBoard[2].occupied).toBe(false);
    expect(board.gameBoard[3].occupied).toBe(false);
    expect(board.gameBoard[4].occupied).toBe(false);
  });

  test("rotateShip() throws when an empty coordinate is passed into it", () => {
    board.placeShip("Carrier", ["A", 1], "horizontal");
    expect(() => {
      board.rotateShip(["I", 1]);
    }).toThrow();
  });

  test("rotateShip() throws when a valid rotation cannot be performed", () => {
    board.placeShip("PatrolBoat", ["A", 1], "horizontal");
    board.placeShip("Submarine", ["B", 1], "horizontal");
    expect(() => {
      board.rotateShip(["A", 1]);
    }).toThrow();
  });
});

describe("Player logic", () => {
  beforeEach(() => {
    human = new Player(true);
    computer = new Player();
  });

  test("Player instantiates with a gameBoard", () => {
    expect(human.gameBoard).toBeTruthy();
  });

  test("Player instantiates with correct types", () => {
    expect(human.type).toBe("human");
    expect(computer.type).toBe("computer");
  });
});

describe("Game logic", () => {
  beforeEach(() => {
    game = new Game(true, "Frost");
  });

  test("setup() allows each ship to be placed on the board until all the ships have been placed by both the players", () => {
    game.setup(
      "Frost",
      ["Carrier", ["A", 1], "vertical"],
      ["Battleship", ["A", 2], "vertical"],
      ["Submarine", ["A", 3], "vertical"],
      ["Destroyer", ["A", 4], "vertical"],
      ["PatrolBoat", ["A", 5], "vertical"],
    );
    game.setup(
      "Bot 1",
      ["Carrier", ["F", 1], "vertical"],
      ["Battleship", ["F", 2], "vertical"],
      ["Submarine", ["F", 3], "vertical"],
      ["Destroyer", ["F", 4], "vertical"],
      ["PatrolBoat", ["F", 5], "vertical"],
    );

    expect(game.playerOne.gameBoard.shipsPlaced().length).toBe(5);
    expect(game.playerTwo.gameBoard.shipsPlaced().length).toBe(5);

    expect(game.playerOne.playerBoard()[0].occupied).toBe(true);
    expect(game.playerOne.playerBoard()[1].occupied).toBe(true);
    expect(game.playerOne.playerBoard()[2].occupied).toBe(true);
    expect(game.playerOne.playerBoard()[3].occupied).toBe(true);
    expect(game.playerOne.playerBoard()[4].occupied).toBe(true);

    expect(game.playerTwo.playerBoard()[60].occupied).toBe(true);
    expect(game.playerTwo.playerBoard()[61].occupied).toBe(true);
    expect(game.playerTwo.playerBoard()[62].occupied).toBe(true);
    expect(game.playerTwo.playerBoard()[63].occupied).toBe(true);
    expect(game.playerTwo.playerBoard()[64].occupied).toBe(true);
  });

  test("setup() throws when an invalid playerName is passed", () => {
    expect(() => {
      game.setup(
        "Jake",
        ["Carrier", ["A", 1], "vertical"],
        ["Battleship", ["A", 2], "vertical"],
        ["Submarine", ["A", 3], "vertical"],
        ["Destroyer", ["A", 4], "vertical"],
        ["PatrolBoat", ["A", 5], "vertical"],
      );
    }).toThrow();
  });

  test("setup() throws when ships are overlapping with one another", () => {
    game.setup("Frost", ["Carrier", ["A", 1], "vertical"]);
    expect(() => {
      game.setup("Frost", ["Battleship", ["A", 1], "vertical"]);
    }).toThrow();
  });

  test("setup() allows one ship to be placed at a time", () => {
    game.setup("Frost", ["Carrier", ["A", 1], "vertical"]);
    game.setup("Frost", ["Battleship", ["A", 2], "vertical"]);
    game.setup("Frost", ["Submarine", ["A", 3], "vertical"]);
    game.setup("Frost", ["Destroyer", ["A", 4], "vertical"]);
    game.setup("Frost", ["PatrolBoat", ["A", 5], "vertical"]);
    expect(game.playerOne.gameBoard.shipsPlaced().length).toBe(5);
    expect(game.playerOne.playerBoard()[0].occupied).toBe(true);
    expect(game.playerOne.playerBoard()[1].occupied).toBe(true);
    expect(game.playerOne.playerBoard()[2].occupied).toBe(true);
    expect(game.playerOne.playerBoard()[3].occupied).toBe(true);
    expect(game.playerOne.playerBoard()[4].occupied).toBe(true);
  });

  test("setup() throws when more than one ship of the same type is placed", () => {
    game.setup("Frost", ["Carrier", ["A", 1], "vertical"]);

    expect(() => {
      game.setup("Frost", ["Carrier", ["A", 1], "vertical"]);
    }).toThrow();
  });

  test("setup() throws when an overflowing coordinate is used to place a ship", () => {
    expect(() => {
      game.setup(
        "Frost",
        ["Carrier", ["A", 1], "vertical"],
        ["Battleship", ["A", 2], "vertical"],
        ["Submarine", ["A", 3], "vertical"],
        ["Destroyer", ["A", 4], "vertical"],
        ["PatrolBoat", ["J", 10], "vertical"],
      );
    }).toThrow();
  });

  test("playRound() allows one player to attack the other player's board", () => {
    game.setup(
      "Frost",
      ["Carrier", ["A", 1], "vertical"],
      ["Battleship", ["A", 2], "vertical"],
      ["Submarine", ["A", 3], "vertical"],
      ["Destroyer", ["A", 4], "vertical"],
      ["PatrolBoat", ["A", 5], "vertical"],
    );

    game.setup(
      "Bot 1",
      ["Carrier", ["F", 1], "vertical"],
      ["Battleship", ["F", 2], "vertical"],
      ["Submarine", ["F", 3], "vertical"],
      ["Destroyer", ["F", 4], "vertical"],
      ["PatrolBoat", ["F", 5], "vertical"],
    );

    game.playRound(["A", 1]); // playerOne shoots at playerTwo @ A, 1
    expect(game.playerTwo.shot(["A", 1])).toBe(true);
    expect(game.playerTwo.shipHit(["A", 1])).toBe(false);

    game.playRound(["A", 1]); // playerTwo shoots at playerOne @ F, 2
    expect(game.playerOne.shot(["A", 1])).toBe(true);
    expect(game.playerOne.shipHit(["A", 1])).toBe(true);
  });

  test("playRound() continues till all the ships of one of the player sinks", () => {
    game.setup(
      "Frost",
      ["Carrier", ["A", 1], "vertical"],
      ["Battleship", ["A", 2], "vertical"],
      ["Submarine", ["A", 3], "vertical"],
      ["Destroyer", ["A", 4], "vertical"],
      ["PatrolBoat", ["A", 5], "vertical"],
    );

    game.setup(
      "Bot 1",
      ["Carrier", ["F", 1], "vertical"],
      ["Battleship", ["F", 2], "vertical"],
      ["Submarine", ["F", 3], "vertical"],
      ["Destroyer", ["F", 4], "vertical"],
      ["PatrolBoat", ["F", 5], "vertical"],
    );

    game.playRound(["F", 1]);
    expect(game.playerTwo.shot(["F", 1])).toBe(true);
    expect(game.playerTwo.shipHit(["F", 1])).toBe(true);
    expect(game.playerTwo.allShipsSunk()).toBe(false);

    game.playRound(["A", 1]);
    expect(game.playerOne.shot(["A", 1])).toBe(true);
    expect(game.playerOne.shipHit(["A", 1])).toBe(true);
    expect(game.playerOne.allShipsSunk()).toBe(false);

    game.playRound(["G", 1]);
    expect(game.playerTwo.shot(["G", 1])).toBe(true);
    expect(game.playerTwo.shipHit(["G", 1])).toBe(true);
    expect(game.playerTwo.allShipsSunk()).toBe(false);

    game.playRound(["B", 1]);
    game.playRound(["H", 1]);
    game.playRound(["C", 1]);
    game.playRound(["I", 1]);
    game.playRound(["D", 1]);

    game.playRound(["J", 1]);

    game.playRound(["E", 1]);
    game.playRound(["F", 2]);
    game.playRound(["A", 2]);
    game.playRound(["G", 2]);
    game.playRound(["B", 2]);
    game.playRound(["H", 2]);
    game.playRound(["C", 2]);

    game.playRound(["I", 2]);

    game.playRound(["D", 2]);
    game.playRound(["F", 3]);
    game.playRound(["A", 3]);
    game.playRound(["G", 3]);
    game.playRound(["B", 3]);

    game.playRound(["H", 3]);

    game.playRound(["C", 3]);
    game.playRound(["F", 4]);
    game.playRound(["A", 4]);
    game.playRound(["G", 4]);
    game.playRound(["B", 4]);

    game.playRound(["H", 4]);

    game.playRound(["C", 4]);
    game.playRound(["F", 5]);
    game.playRound(["A", 5]);
    game.playRound(["G", 5]);

    expect(game.playRound(["B", 5])).toBe("Game over! Frost wins!");
  });

  test("playRound() throws for ships not being set up for both players", () => {
    let newGame = new Game(false, "Boo", "Booger");
    newGame.setup("Boo", ["PatrolBoat", ["A", 1], "vertical"]);

    newGame.setup("Booger", ["PatrolBoat", ["C", 1], "vertical"]);

    expect(() => {
      newGame.playRound(["C", 1]);
    }).toThrow();
  });
});

describe("Randomise logic", () => {
  beforeEach(() => {
    game = new Game(true);
  });
  test("randomiseSetup randomly places all 5 ships for the provided player", () => {
    randomiseSetup(game, game.playerOne);
    expect(game.playerOne.setup).toBe(true);
    randomiseSetup(game, game.playerTwo);
    expect(game.playerTwo.setup).toBe(true);
  });
});
