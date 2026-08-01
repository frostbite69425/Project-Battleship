const validX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

class BotAI {
  constructor() {
    this.lastHitIndex;
    this.hitIndices = [];
    this.validMoves = [];
    this.priorityGrids = [];
  }

  #getIndex(coords) {
    const [x, y] = coords;
    const xIndex = validX.indexOf(x);
    const yIndex = y - 1;

    return xIndex * 10 + yIndex;
  }

  #pushValidMoves(xIndex, yIndex) {
    if (
      this.lastHitIndex + 1 < (xIndex + 1) * 10 &&
      !this.hitIndices.includes(this.lastHitIndex + 1)
    ) {
      this.validMoves.push({
        coords: [validX[xIndex], yIndex + 2],
        orientation: "horizontal",
      });
    }
    if (
      this.lastHitIndex - 1 > xIndex * 10 &&
      !this.hitIndices.includes(this.lastHitIndex - 1)
    ) {
      this.validMoves.push({
        coords: [validX[xIndex], yIndex],
        orientation: "horizontal",
      });
    }
    if (
      this.lastHitIndex - 10 >= 0 &&
      !this.hitIndices.includes(this.lastHitIndex - 10)
    ) {
      this.validMoves.push({
        coords: [validX[xIndex - 1], yIndex + 1],
        orientation: "vertical",
      });
    }
    if (
      this.lastHitIndex + 10 < 100 &&
      !this.hitIndices.includes(this.lastHitIndex + 10)
    ) {
      this.validMoves.push({
        coords: [validX[xIndex + 1], yIndex + 1],
        orientation: "vertical",
      });
    }
  }

  #pushPriorityMoves(index, orientation) {
    while (this.validMoves.length > 0) {
      let move = this.validMoves.pop();
      if (move.orientation === orientation) {
        this.priorityGrids.push({
          coords: move.coords,
          orientation: orientation,
        });
      }
    }

    if (orientation === "horizontal") {
      if (
        index + 1 < (Math.floor(index / 10) + 1) * 10 &&
        !this.hitIndices.includes(index + 1)
      ) {
        this.priorityGrids.push({
          coords: [validX[Math.floor(index / 10)], (index % 10) + 2],
          orientation: "horizontal",
        });
      }
      if (
        index - 1 >= Math.floor(index / 10) * 10 &&
        !this.hitIndices.includes(index - 1)
      ) {
        this.priorityGrids.push({
          coords: [validX[Math.floor(index / 10)], index % 10],
          orientation: "horizontal",
        });
      }
    } else if (orientation === "vertical") {
      if (index - 10 > 0 && !this.hitIndices.includes(index - 10)) {
        this.priorityGrids.push({
          coords: [validX[Math.floor(index / 10) - 1], (index % 10) + 1],
          orientation: "vertical",
        });
      }
      if (index + 10 < 100 && !this.hitIndices.includes(index + 10)) {
        this.priorityGrids.push({
          coords: [validX[Math.floor(index / 10) + 1], (index % 10) + 1],
          orientation: "vertical",
        });
      }
    }
  }

  aiMove(defenderGameboard) {
    if (this.validMoves.length > 0 || this.priorityGrids.length > 0) {
      let index;
      let xCoord;
      let yCoord;
      let validMove;

      if (this.priorityGrids.length === 0) {
        validMove = this.validMoves.pop();
        [xCoord, yCoord] = validMove.coords;
        index = this.#getIndex([xCoord, yCoord]);

        while (this.hitIndices.includes(index)) {
          validMove = this.validMoves.pop();
          [xCoord, yCoord] = validMove.coords;
          index = this.#getIndex([xCoord, yCoord]);
        }
      } else {
        validMove = this.priorityGrids.pop();
        [xCoord, yCoord] = validMove.coords;
        index = this.#getIndex([xCoord, yCoord]);

        while (this.hitIndices.includes(index)) {
          validMove = this.priorityGrids.pop();
          [xCoord, yCoord] = validMove.coords;
          index = this.#getIndex([xCoord, yCoord]);
        }
      }

      this.hitIndices.push(index);

      if (defenderGameboard[index].ship) {
        this.lastHitIndex = index;
        this.#pushPriorityMoves(this.lastHitIndex, validMove.orientation);
      }

      return [xCoord, yCoord];
    } else {
      let randomXIndex = getRandomIntInclusive(0, 9);
      let randomYIndex = getRandomIntInclusive(0, 9);

      let index = randomXIndex * 10 + randomYIndex;

      while (this.hitIndices.includes(index)) {
        randomXIndex = getRandomIntInclusive(0, 9);
        randomYIndex = getRandomIntInclusive(0, 9);
        index = randomXIndex * 10 + randomYIndex;
      }

      let x = validX[randomXIndex];
      let y = randomYIndex + 1;

      this.hitIndices.push(index);

      if (defenderGameboard[index].ship) {
        this.lastHitIndex = index;
        this.#pushValidMoves(randomXIndex, randomYIndex);
      }
      return [x, y];
    }
  }
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export default BotAI;
