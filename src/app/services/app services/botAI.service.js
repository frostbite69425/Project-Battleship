const validX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function getIndex(coords) {
  const [x, y] = coords;
  const xIndex = validX.indexOf(x);
  const yIndex = y - 1;

  return xIndex * 10 + yIndex;
}

const hitIndices = [];

let lastHitIndex;
let validMoves = [];
let priorityGrids = [];

function pushValidMoves(xIndex, yIndex) {
  if (
    lastHitIndex + 1 < (xIndex + 1) * 10 &&
    !hitIndices.includes(lastHitIndex + 1)
  ) {
    validMoves.push({
      coords: [validX[xIndex], yIndex + 2],
      orientation: "horizontal",
    });
  }
  if (
    lastHitIndex - 1 > xIndex * 10 &&
    !hitIndices.includes(lastHitIndex - 1)
  ) {
    validMoves.push({
      coords: [validX[xIndex], yIndex],
      orientation: "horizontal",
    });
  }
  if (lastHitIndex - 10 >= 0 && !hitIndices.includes(lastHitIndex - 10)) {
    validMoves.push({
      coords: [validX[xIndex - 1], yIndex + 1],
      orientation: "vertical",
    });
  }
  if (lastHitIndex + 10 < 100 && !hitIndices.includes(lastHitIndex + 10)) {
    validMoves.push({
      coords: [validX[xIndex + 1], yIndex + 1],
      orientation: "vertical",
    });
  }
}

function pushPriorityMoves(index, orientation) {
  while (validMoves.length > 0) {
    let move = validMoves.pop();
    if (move.orientation === orientation) {
      priorityGrids.push({
        coords: move.coords,
        orientation: orientation,
      });
    }
  }

  if (orientation === "horizontal") {
    if (
      index + 1 < (Math.floor(index / 10) + 1) * 10 &&
      !hitIndices.includes(index + 1)
    ) {
      priorityGrids.push({
        coords: [validX[Math.floor(index / 10)], (index % 10) + 2],
        orientation: "horizontal",
      });
    }
    if (
      index - 1 >= Math.floor(index / 10) * 10 &&
      !hitIndices.includes(index - 1)
    ) {
      priorityGrids.push({
        coords: [validX[Math.floor(index / 10)], index % 10],
        orientation: "horizontal",
      });
    }
  } else if (orientation === "vertical") {
    if (index - 10 > 0 && !hitIndices.includes(index - 10)) {
      priorityGrids.push({
        coords: [validX[Math.floor(index / 10) - 1], (index % 10) + 1],
        orientation: "vertical",
      });
    }
    if (index + 10 < 100 && !hitIndices.includes(index + 10)) {
      priorityGrids.push({
        coords: [validX[Math.floor(index / 10) + 1], (index % 10) + 1],
        orientation: "vertical",
      });
    }
  }
}

const botAI = (defenderGameboard) => {
  if (validMoves.length > 0 || priorityGrids.length > 0) {
    let index;
    let xCoord;
    let yCoord;
    let validMove;

    if (priorityGrids.length === 0) {
      validMove = validMoves.pop();
      [xCoord, yCoord] = validMove.coords;
      index = getIndex([xCoord, yCoord]);

      while (hitIndices.includes(index)) {
        validMove = validMoves.pop();
        [xCoord, yCoord] = validMove.coords;
        index = getIndex([xCoord, yCoord]);
      }
    } else {
      validMove = priorityGrids.pop();
      [xCoord, yCoord] = validMove.coords;
      index = getIndex([xCoord, yCoord]);

      while (hitIndices.includes(index)) {
        validMove = priorityGrids.pop();
        [xCoord, yCoord] = validMove.coords;
        index = getIndex([xCoord, yCoord]);
      }
    }

    hitIndices.push(index);

    if (defenderGameboard[index].ship) {
      lastHitIndex = index;
      pushPriorityMoves(lastHitIndex, validMove.orientation);
    }

    return [xCoord, yCoord];
  } else {
    let randomXIndex = getRandomIntInclusive(0, 9);
    let randomYIndex = getRandomIntInclusive(0, 9);

    let index = randomXIndex * 10 + randomYIndex;

    while (hitIndices.includes(index)) {
      randomXIndex = getRandomIntInclusive(0, 9);
      randomYIndex = getRandomIntInclusive(0, 9);
      index = randomXIndex * 10 + randomYIndex;
    }

    let x = validX[randomXIndex];
    let y = randomYIndex + 1;

    hitIndices.push(index);

    if (defenderGameboard[index].ship) {
      lastHitIndex = index;
      pushValidMoves(randomXIndex, randomYIndex);
    }
    return [x, y];
  }
};

export default botAI;
