import GameBoard from "./gameBoard.utility.js";

const validX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

class Player {
  constructor(human = false) {
    this.gameBoard = new GameBoard();
    this.name = undefined;
    if (!human) {
      this.type = "computer";
      this.name = "Bot 1";
    } else {
      this.type = "human";
    }
  }

  receiveAttack([x, y]) {
    this.gameBoard.receiveAttack([x, y]);
  }

  playerBoard() {
    return this.gameBoard.board();
  }

  allShipsSunk() {
    return this.gameBoard.allSunk();
  }

  shot([x, y]) {
    const index = validX.indexOf(x) * 10 + y - 1;
    return this.gameBoard.board()[index].shot;
  }

  shipHit([x, y]) {
    if (this.shot([x, y])) {
      return this.gameBoard.shipHit([x, y]);
    }
    return false;
  }
}

export default Player;
