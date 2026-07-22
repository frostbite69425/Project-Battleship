import elementFactory from "../../utils/ui utils/elementFactory.utility.js";
import shipHead from "../../../assets/icons/startShip.png";
import shipMid from "../../../assets/icons/midShip.png";
import shipEnd from "../../../assets/icons/endShip.png";

const rerenderGrids = (board) => {
  const gridHolder = document.querySelector(".grid-holder");
  while (gridHolder.lastChild) {
    gridHolder.removeChild(gridHolder.firstChild);
  }
  for (let grid of board) {
    let gridDiv = elementFactory("div", "grid-div");
    gridDiv.domElement.dataset.xValue = grid.x;
    gridDiv.domElement.dataset.yValue = grid.y;
    gridDiv.domElement.dataset.occupied = grid.occupied;
    gridDiv.domElement.dataset.shot = grid.shot;
    if (grid.ship !== null) {
      gridDiv.domElement.dataset.shipType = grid.ship.constructor.name;
      if (grid.readHeadNode()) {
        gridDiv.domElement.dataset.headNode = grid.readHeadNode();
        let shipHeadImg = elementFactory("img", "ship-head");
        shipHeadImg.domElement.src = shipHead;
        gridDiv.domElement.appendChild(shipHeadImg.domElement);
      } else if (grid.readEndNode()) {
        gridDiv.domElement.dataset.endNode = grid.readEndNode();
        let shipEndImg = elementFactory("img", "ship-end");
        shipEndImg.domElement.src = shipEnd;
        gridDiv.domElement.appendChild(shipEndImg.domElement);
      } else {
        let shipMidImg = elementFactory("img", "ship-mid");
        shipMidImg.domElement.src = shipMid;
        gridDiv.domElement.appendChild(shipMidImg.domElement);
      }
    }
    gridHolder.appendChild(gridDiv.domElement);
  }
};

export default rerenderGrids;
