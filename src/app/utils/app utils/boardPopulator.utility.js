class BoardCoordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.occupied = false;
    this.shot = false;
  }

  occupy() {
    if (!this.occupied) {
      this.occupied = true;
    } else {
      throw Error("The square is already occupied!");
    }
  }

  shoot() {
    if (!this.shot) {
      this.shot = true;
    } else {
      throw Error("You have already shot at this grid!");
    }
  }
}

const boardPopulator = () => {
  const board = [];
  const xCoords = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  for (let j = 0; j < xCoords.length; j++) {
    for (let i = 1; i <= 10; i++) {
      let coordinate = new BoardCoordinate(xCoords[j], i);
      board.push(coordinate);
    }
  }

  return board;
};

export default boardPopulator;
