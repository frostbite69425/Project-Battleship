class Ship {
  #hasSunk;
  #hits;
  constructor() {
    this.length = undefined;
    this.#hasSunk = false;
    this.#hits = 0;
  }

  get hits() {
    return this.#hits;
  }

  hit() {
    this.#hits++;
  }

  isSunk() {
    const hits = this.hits;
    const length = this.length;
    if (hits >= length) {
      this.#hasSunk = true;
      return this.#hasSunk;
    } else {
      this.#hasSunk = false;
      return this.#hasSunk;
    }
  }
}

export default Ship;
