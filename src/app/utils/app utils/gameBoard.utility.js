import * as shipTypes from "./shipTypeClass.utility.js";

import boardPopulator from "./boardPopulator.utility.js";

const validX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

class GameBoard {
  constructor() {
    this.gameBoard = boardPopulator();
    this.ships = [];
  }

  board() {
    return this.gameBoard;
  }

  placeShip(shipType, head, orientation) {
    let ship = new shipTypes[shipType]();
    let [headX, headY] = head;

    const xIndex = validX.indexOf(headX);

    if (ship == undefined || xIndex === -1 || headY > 10 || headY < 1) {
      throw new Error(
        "You have invoked placeShip with invalid arguments! Please try agian with a valid ship and valid start coordinates and orientation!",
      );
    }

    const validTail = {
      vertical: [validX[xIndex + ship.length - 1], headY],
      horizontal: [headX, headY + ship.length - 1],
    };

    let layout = String(orientation).toLowerCase();

    if (layout != "vertical" && layout != "horizontal") {
      throw new Error("You need to select a valid orientation!");
    }

    const end = validTail[layout];

    const start = xIndex * 10 + headY - 1;

    this.ships.push(ship);

    if (layout === "horizontal") {
      for (let i = start; i < end[1]; i++) {
        this.gameBoard[i].occupy();
        this.gameBoard[i].ship = ship;
      }
    } else {
      for (
        let i = start;
        i <= validX.indexOf(end[0]) * 10 + headY - 1;
        i = i + 10
      ) {
        this.gameBoard[i].occupy();
        this.gameBoard[i].ship = ship;
      }
    }
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
    ship.hit();
  }

  allSunk() {
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].isSunk() === false) {
        return false;
      }
    }
    return true;
  }
}
export default GameBoard;
