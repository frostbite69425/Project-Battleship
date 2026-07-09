class BoardCoordinate {
  #taken;
  #hit;
  #shipType;
  #headNodeIndex;
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.#taken = false;
    this.#hit = false;
    this.#shipType = null;
    this.#headNodeIndex = null;
  }

  get headNodeIndex() {
    return this.#headNodeIndex;
  }

  set headNodeIndex(x) {
    this.#headNodeIndex = x;
  }

  get ship() {
    return this.#shipType;
  }

  set ship(x) {
    this.#shipType = x;
  }

  get coordinates() {
    return [this.x, this.y];
  }

  get occupied() {
    return this.#taken;
  }

  set #occupied(x) {
    this.#taken = x;
  }

  get shot() {
    return this.#hit;
  }

  set #shot(x) {
    this.#hit = x;
  }

  occupy() {
    if (!this.occupied) {
      this.#occupied = true;
    } else {
      throw new Error("The grid is already occupied!");
    }
  }

  clearGrid() {
    if (this.occupied) {
      this.#occupied = false;
    } else {
      throw new Error("The grid is already not occupied!");
    }
  }

  shoot() {
    if (!this.shot) {
      this.#shot = true;
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
