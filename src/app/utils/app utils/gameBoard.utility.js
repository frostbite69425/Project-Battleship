import * as shipTypes from "./shipTypeClass.utility.js";

import boardPopulator from "./boardPopulator.utility.js";

class GameBoard {
  constructor() {
    this.gameBoard = boardPopulator();
  }
}

export default GameBoard;
