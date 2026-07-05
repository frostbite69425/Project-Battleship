import GameBoard from "./gameBoard.utility.js";

class Player {
  constructor(human = false) {
    this.gameBoard = new GameBoard();
    if (!human) {
      this.type = "computer";
    } else {
      this.type = "human";
    }
  }
}

export default Player;
