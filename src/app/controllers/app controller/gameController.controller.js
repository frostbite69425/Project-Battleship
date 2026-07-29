import Player from "../../utils/app utils/player.utility.js";

class Game {
  #turn;
  #attacker;
  #defender;
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
      this.passStatus = true;
    }
    this.playerOne.name = playerOneName;
    this.playerTwo.name = playerTwoName;
    this.singlePlayer = singlePlayer;
    this.#turn = 1;
    this.#attacker = this.playerOne;
    this.#defender = this.playerTwo;
  }

  togglePass() {
    this.passStatus = this.passStatus == true ? false : true;
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
    if (!this.playerOne.setup || !this.playerTwo.setup) {
      throw new Error(
        `Cannot play round without first setting up the ships for both players!`,
      );
    }

    if (!this.#attacker.allShipsSunk() && !this.#defender.allShipsSunk()) {
      this.#turn++;
      this.#defender.receiveAttack([x, y]);
      if (!this.#defender.shipHit([x, y])) {
        let temp = this.#attacker;
        this.#attacker = this.#defender;
        this.#defender = temp;
      }
    } else {
      if (this.#attacker.allShipsSunk()) {
        return `Game over! ${this.#defender.name} wins!`;
      } else {
        return `Game over! ${this.#attacker.name} wins!`;
      }
    }
  }

  attackerWin() {
    return this.#defender.allShipsSunk();
  }

  attacker() {
    return this.#attacker;
  }

  defender() {
    return this.#defender;
  }

  getTurn() {
    return this.#turn;
  }
}

export default Game;
