import * as shipTypes from "./shipTypeClass.utility.js";

import boardPopulator from "./boardPopulator.utility.js";

const validX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

class GameBoard {
  #shipsOnBoard = [];
  constructor() {
    this.gameBoard = boardPopulator();
    this.ships = [];
    this.#shipsOnBoard;
  }

  shipsPlaced() {
    return this.#shipsOnBoard;
  }

  board() {
    return this.gameBoard;
  }

  placeShip(shipType, head, orientation, rotateOverride = false) {
    let ship;
    try {
      ship = new shipTypes[shipType]();
    } catch (e) {
      throw new Error(
        "Invalid ship type used! Please try again with a valid ship type!",
        { cause: e },
      );
    }
    let [headX, headY] = head;

    const xIndex = validX.indexOf(headX);

    if (xIndex === -1 || headY > 10 || headY < 1) {
      throw new Error(
        "You have invoked placeShip with invalid arguments! Please try agian with a valid ship and valid start coordinates and orientation!",
      );
    }

    const validTail = {
      vertical: (xIndex + ship.length - 1) * 10 + headY,
      horizontal: xIndex * 10 + headY - 1 + ship.length - 1,
    };

    let layout = String(orientation).toLowerCase();

    if (layout != "vertical" && layout != "horizontal") {
      throw new Error("You need to select a valid orientation!");
    }

    if (validTail.vertical > 100 && layout == "vertical") {
      throw new Error(
        `A ${shipType} cannot be placed here with the ${orientation} orientation!`,
      );
    } else if (
      validTail.horizontal >= (xIndex + 1) * 10 &&
      layout == "horizontal"
    ) {
      throw new Error(
        `A ${shipType} cannot be placed here with the ${orientation} orientation!`,
      );
    }

    const end = validTail[layout];

    let start = xIndex * 10 + headY - 1;

    if (!rotateOverride) {
      if (this.#shipsOnBoard.includes(shipType)) {
        throw new Error(
          `You already have a ${shipType} on your board! Please try to place a different ship.`,
        );
      }
    }

    let validGrids = [];

    if (layout === "horizontal") {
      if (rotateOverride) {
        start = start + 1;
      }
      for (let i = start; i <= end; i++) {
        if (this.gameBoard[i].occupied) {
          throw new Error("Two ships cannot occupy the same grid!");
        }
        validGrids.push(this.gameBoard[i]);
      }
    } else {
      if (rotateOverride) {
        start = start + 10;
      }
      for (let i = start; i <= end; i = i + 10) {
        if (this.gameBoard[i].occupied) {
          throw new Error("Ship cannot overlap!");
        }
        validGrids.push(this.gameBoard[i]);
      }
    }

    this.#shipsOnBoard.push(shipType);
    this.ships.push(ship);

    validGrids.forEach((validGrid) => {
      validGrid.occupy();
      validGrid.ship = ship;
      validGrid.headNodeIndex = start;
    });

    validGrids[0].toggleHeadNode();
    validGrids[validGrids.length - 1].toggleEndNode();
  }

  receiveAttack([x, y]) {
    const index = validX.indexOf(x) * 10 + y - 1;
    if (index < 0) {
      throw new Error(
        "Invalid arguments! Please provide valid grid coordinates!",
      );
    }
    const grid = this.gameBoard[index];
    grid.shoot();
    const ship = this.gameBoard[index].ship;
    if (ship !== null) {
      ship.hit();
    }
  }

  allSunk() {
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].isSunk() === false) {
        return false;
      }
    }
    return true;
  }

  shipHit([x, y]) {
    const index = validX.indexOf(x) * 10 + y - 1;

    if (index < 0) {
      throw new Error(
        "Invalid arguments! Please provide valid grid coordinates!",
      );
    }
    const ship = this.gameBoard[index].ship;

    if (ship !== null) {
      return true;
    }
    return false;
  }

  clearShip(shipType, head) {
    let [headX, headY] = head;
    let xIndex = validX.indexOf(headX);
    const index = xIndex * 10 + headY - 1;

    let grid = this.gameBoard[index];
    if (!grid.occupied) {
      throw new Error("No ship there to clear!");
    }

    if (grid.ship.constructor.name !== shipType) {
      throw new Error("Ship types do not match!");
    }

    const ship = grid.ship;
    const headNode = this.gameBoard[grid.headNodeIndex];

    const validTail = {
      vertical: grid.headNodeIndex + (headNode.ship.length - 1) * 10,
      horizontal: grid.headNodeIndex + headNode.ship.length - 1,
    };

    if (
      this.gameBoard[validTail.vertical].occupied &&
      this.gameBoard[validTail.vertical].ship.length === headNode.ship.length
    ) {
      for (let i = grid.headNodeIndex; i <= validTail.vertical; i = i + 10) {
        this.gameBoard[i].clearGrid();
        this.gameBoard[i].ship = null;
        this.gameBoard[i].headNodeIndex = null;
      }

      let filteredShips = this.ships.filter(
        (storedShip) => storedShip.length !== ship.length,
      );
      this.ships = filteredShips;

      let filteredShipTypes = this.#shipsOnBoard.filter(
        (stored) => stored !== ship.constructor.name,
      );
      this.#shipsOnBoard = filteredShipTypes;
      headNode.toggleHeadNode();
      this.gameBoard[validTail.vertical].toggleEndNode();
    } else if (
      this.gameBoard[validTail.horizontal].occupied &&
      this.gameBoard[validTail.horizontal].ship.length === headNode.ship.length
    ) {
      for (let i = grid.headNodeIndex; i <= validTail.horizontal; i++) {
        this.gameBoard[i].clearGrid();
        this.gameBoard[i].ship = null;
        this.gameBoard[i].headNodeIndex = null;
      }

      let filteredShips = this.ships.filter(
        (storedShip) => storedShip.length !== ship.length,
      );
      this.ships = filteredShips;

      let filteredShipTypes = this.#shipsOnBoard.filter(
        (stored) => stored !== ship.constructor.name,
      );
      this.#shipsOnBoard = filteredShipTypes;
      headNode.toggleHeadNode();
      this.gameBoard[validTail.horizontal].toggleEndNode();
    } else {
      throw new Error("Cannot clear the specified ship from this grid!");
    }
  }

  relocateShip(shipType, start, end) {
    let [headX, headY] = start;
    let xIndex = validX.indexOf(headX);
    const index = xIndex * 10 + headY - 1;

    let grid = this.gameBoard[index];
    if (!grid.occupied) {
      throw new Error("No ship there to relocate!");
    }

    if (grid.ship.constructor.name !== shipType) {
      throw new Error("Ship types do not match!");
    }

    const headNode = this.gameBoard[grid.headNodeIndex];

    const validTail = {
      vertical: grid.headNodeIndex + (headNode.ship.length - 1) * 10,
      horizontal: grid.headNodeIndex + headNode.ship.length - 1,
    };

    if (
      this.gameBoard[validTail.vertical].occupied &&
      this.gameBoard[validTail.vertical].ship.length === headNode.ship.length
    ) {
      try {
        this.clearShip(shipType, start);
        this.placeShip(shipType, end, "vertical");
      } catch (error) {
        return error;
      }
    } else if (
      this.gameBoard[validTail.horizontal].occupied &&
      this.gameBoard[validTail.horizontal].ship.length === headNode.ship.length
    ) {
      try {
        this.clearShip(shipType, start);
        this.placeShip(shipType, end, "vertical");
      } catch (error) {
        return error;
      }
    } else {
      throw new Error("Cannot relocate the ship on this grid!");
    }
  }

  rotateShip([x, y]) {
    let xIndex = validX.indexOf(x);
    const index = xIndex * 10 + y - 1;

    let grid = this.gameBoard[index];
    if (!grid.occupied) {
      throw new Error("No ship there to rotate!");
    }

    const ship = grid.ship;
    const headNode = this.gameBoard[grid.headNodeIndex];

    const validTail = {
      vertical: grid.headNodeIndex + (headNode.ship.length - 1) * 10,
      horizontal: grid.headNodeIndex + headNode.ship.length - 1,
    };

    if (
      this.gameBoard[validTail.vertical].occupied &&
      this.gameBoard[validTail.vertical].ship.length === headNode.ship.length &&
      !this.gameBoard[validTail.horizontal].occupied
    ) {
      try {
        this.placeShip(
          ship.constructor.name,
          headNode.coordinates,
          "horizontal",
          true,
        );
      } catch (error) {
        throw new Error(error, { cause: error });
      }
      for (
        let i = grid.headNodeIndex + 10;
        i <= validTail.vertical;
        i = i + 10
      ) {
        this.gameBoard[i].clearGrid();
        this.gameBoard[i].ship = null;
        this.gameBoard[i].headNodeIndex = null;
      }
    } else if (
      this.gameBoard[validTail.horizontal].occupied &&
      this.gameBoard[validTail.horizontal].ship.length ===
        headNode.ship.length &&
      !this.gameBoard[validTail.vertical].occupied
    ) {
      try {
        this.placeShip(
          ship.constructor.name,
          headNode.coordinates,
          "vertical",
          true,
        );
      } catch (error) {
        throw new Error(error, { cause: error });
      }

      for (let i = grid.headNodeIndex + 1; i <= validTail.horizontal; i++) {
        this.gameBoard[i].clearGrid();
        this.gameBoard[i].ship = null;
        this.gameBoard[i].headNodeIndex = null;
      }
    } else {
      throw new Error("Cannot perform a viable rotation on this ship!");
    }
  }
}

export default GameBoard;
