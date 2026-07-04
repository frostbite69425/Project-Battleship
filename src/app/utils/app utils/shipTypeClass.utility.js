import Ship from "./shipClass.utility.js";

class Carrier extends Ship {
  constructor() {
    super();
  }
  length = 5;
}

class Battleship extends Ship {
  constructor() {
    super();
  }
  length = 4;
}

class Destroyer extends Ship {
  constructor() {
    super();
  }
  length = 3;
}

class Submarine extends Ship {
  constructor() {
    super();
  }
  length = 3;
}

class PatrolBoat extends Ship {
  constructor() {
    super();
  }
  length = 2;
}

export { Carrier, Battleship, Destroyer, Submarine, PatrolBoat };
