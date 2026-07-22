const randomiseSetup = (Game, player) => {
  const validX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const validOrientation = ["vertical", "horizontal"];
  const validShips = [
    "Battleship",
    "Carrier",
    "Destroyer",
    "PatrolBoat",
    "Submarine",
  ];

  player.clearBoard();

  function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  let shipsPlaced = player.gameBoard.shipsPlaced().length;

  const initiatedShips = [];
  while (shipsPlaced < 5) {
    try {
      let randomPos = [
        validX[getRandomIntInclusive(0, 9)],
        getRandomIntInclusive(1, 10),
      ];

      let randomShip = validShips[getRandomIntInclusive(0, 4)];

      if (initiatedShips.includes(randomShip)) {
        while (initiatedShips.includes(randomShip)) {
          randomShip = validShips[getRandomIntInclusive(0, 4)];
        }
      }

      let randomOrientation = validOrientation[getRandomIntInclusive(0, 1)];

      Game.setup(player.name, [randomShip, randomPos, randomOrientation]);
      initiatedShips.push(randomShip);
    } catch (e) {
      // console.log(e); COMMENTING THIS OUT SINCE THE ERRORS AREN'T RELEVANT
    }
    shipsPlaced = player.gameBoard.shipsPlaced().length;
  }
};

export default randomiseSetup;
