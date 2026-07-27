import elementFactory from "../../utils/ui utils/elementFactory.utility.js";
import shipSprites from "../../utils/ui utils/shipSprites.utility.js";

const rerenderBoards = (game) => {
  const boardOne = document.querySelectorAll("#board-one");
  const boardTwo = document.querySelectorAll("#board-two");

  let attackerBoard;
  let defenderBoard;
  let attackerGameboard = game.attacker().playerBoard();
  let defenderGameboard = game.defender().playerBoard();

  if (game.attacker().name === game.playerOne.name) {
    attackerBoard = boardOne;
    defenderBoard = boardTwo;
  } else {
    attackerBoard = boardTwo;
    defenderBoard = boardOne;
  }

  for (let i = 0; i < attackerBoard.length; i++) {
    let attGridDiv = attackerBoard[i];
    let defGridDiv = defenderBoard[i];
    defGridDiv.innerHTML = "";
    defGridDiv.dataset.occupied = false;

    let attGrid = attackerGameboard[i];
    let defGrid = defenderGameboard[i];

    attGridDiv.dataset.occupied = attGrid.occupied;
    attGridDiv.dataset.shot = attGrid.shot;
    attGridDiv.innerHTML = "";

    if (attGrid.ship !== null) {
      let shipType = attGrid.ship.constructor.name;
      attGridDiv.dataset.shipType = shipType;
      let shipGridImg = elementFactory("img", "ship-grid-img");
      shipGridImg.domElement.dataset.shipType = attGrid.ship.constructor.name;
      attGridDiv.appendChild(shipGridImg.domElement);
      if (attGrid.orientation === "vertical") {
        shipGridImg.domElement.classList.add("vertical-grid");
      }
      if (attGrid.readHeadNode()) {
        attGridDiv.dataset.headNode = attGrid.readHeadNode();
        shipGridImg.domElement.src = shipSprites[shipType].shipHead;
      } else if (attGrid.readEndNode()) {
        attGridDiv.dataset.endNode = attGrid.readEndNode();
        shipGridImg.domElement.src = shipSprites[shipType].shipEnd;
      } else {
        shipGridImg.domElement.src = shipSprites[shipType].shipMid;
      }
    } else {
      attGridDiv.removeAttribute("data-ship-type");
      attGridDiv.removeAttribute("data-head-node");
      attGridDiv.removeAttribute("data-end-node");
    }

    if (defGrid.ship !== null && defGrid.shot) {
      let shipType = defGrid.ship.constructor.name;
      defGridDiv.dataset.shipType = shipType;
      defGridDiv.dataset.shot = defGrid.shot;
      let shipGridImg = elementFactory("img", "ship-grid-img");
      shipGridImg.domElement.dataset.shipType = defGrid.ship.constructor.name;
      defGridDiv.appendChild(shipGridImg.domElement);
      if (defGrid.orientation === "vertical") {
        shipGridImg.domElement.classList.add("vertical-grid");
      }
      if (defGrid.readHeadNode()) {
        defGridDiv.dataset.headNode = defGrid.readHeadNode();
        shipGridImg.domElement.src = shipSprites[shipType].shipHead;
      } else if (defGrid.readEndNode()) {
        defGridDiv.dataset.endNode = defGrid.readEndNode();
        shipGridImg.domElement.src = shipSprites[shipType].shipEnd;
      } else {
        shipGridImg.domElement.src = shipSprites[shipType].shipMid;
      }
      if (!defGrid.ship.isSunk()) {
        shipGridImg.domElement.src = shipSprites.hit;
      }
    } else {
      defGridDiv.removeAttribute("data-ship-type");
      defGridDiv.removeAttribute("data-head-node");
      defGridDiv.removeAttribute("data-end-node");
    }
  }
};

export default rerenderBoards;
