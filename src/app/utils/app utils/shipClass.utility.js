class Ship {
  #length;
  #hasSunk;
  #hits;
  constructor() {
    this.#length = undefined;
    this.#hasSunk = false;
    this.#hits = 0;
  }

  get length() {
    return this.#length;
  }

  set length(x) {
    this.#length = x;
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
      return true;
    } else {
      return false;
    }
  }
}

export default Ship;
