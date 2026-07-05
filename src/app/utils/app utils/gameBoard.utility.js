import * as shipTypes from "./shipTypeClass.utility.js";

import boardPopulator from "./boardPopulator.utility.js";

class GameBoard {
  constructor() {
    this.gameBoard = boardPopulator();
  }

  placeShip(shipType, head, orientation) {
    let ship = new shipTypes[shipType]();
    let [headX, headY] = head;
    const validX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
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

    if (layout === "horizontal") {
      for (let i = xIndex * 10 + headY - 1; i < end[1]; i++) {
        this.gameBoard[i].occupy();
      }
    } else {
      for (
        let i = xIndex * 10 + headY - 1;
        i <= validX.indexOf(end[0]) * 10 + headY - 1;
        i = i + 10
      ) {
        console.log(i);

        this.gameBoard[i].occupy();
      }
    }
  }
}

export default GameBoard;
