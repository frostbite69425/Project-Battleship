import Player from "../../utils/app utils/player.utility.js";

let attacker;
let defender;

class Game {
  #turn;
  constructor(
    singlePlayer = true,
    playerOneName = "player",
    playerTwoName = "Bot 1",
  ) {
    this.playerOne = new Player(true);
    if (singlePlayer) {
      this.playerTwo = new Player();
    } else {
      this.playerTwo = new Player(true);
    }
    this.playerOne.name = playerOneName;
    this.playerTwo.name = playerTwoName;
    this.singlePlayer = singlePlayer;
    this.#turn = 1;
  }

  finishSetup(player) {
    player.finishSetup();
  }

  resetSetup(player) {
    player.resetSetup();
  }

  get gameMode() {
    return this.singlePlayer;
  }

  setup(player, ...positions) {
    let activePlayer;
    if (player === this.playerOne.name) {
      activePlayer = this.playerOne;
    } else if (player === this.playerTwo.name || player === undefined) {
      activePlayer = this.playerTwo;
    } else {
      throw new Error(
        "You have provided an invalid player name! Please try again.",
      );
    }

    for (let position of positions) {
      let [shipType, coordinates, orientation] = position;
      activePlayer.gameBoard.placeShip(shipType, coordinates, orientation);
    }

    if (
      activePlayer === this.playerOne &&
      this.playerOne.gameBoard.shipsPlaced().length === 5
    ) {
      this.playerOne.finishSetup();
    } else if (
      activePlayer === this.playerTwo &&
      this.playerTwo.gameBoard.shipsPlaced().length === 5
    ) {
      this.playerTwo.finishSetup();
    }
  }

  playRound([x, y]) {
    attacker = this.playerOne;
    defender = this.playerTwo;
    if (!this.playerOne.setup || !this.playerTwo.setup) {
      throw new Error(
        `Cannot play round without first setting up the ships for both players!`,
      );
    }
    if (this.#turn % 2 === 0) {
      defender = this.playerOne;
      attacker = this.playerTwo;
    }
    if (!attacker.allShipsSunk() && !defender.allShipsSunk()) {
      this.#turn++;
      defender.receiveAttack([x, y]);
    } else {
      if (attacker.allShipsSunk()) {
        return `Game over! ${defender.name} wins!`;
      } else {
        return `Game over! ${attacker.name} wins!`;
      }
    }
  }

  getTurn() {
    return this.#turn;
  }
}

export default Game;
