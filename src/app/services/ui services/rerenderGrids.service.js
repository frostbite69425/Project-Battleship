import elementFactory from "../../utils/ui utils/elementFactory.utility.js";

import shipSprites from "../../utils/ui utils/shipSprites.utility.js";

const rerenderGrids = (board) => {
  const gridDivs = document.querySelectorAll(".grid-holder .grid-div");
  for (let i = 0; i < board.length; i++) {
    let gridDiv = gridDivs[i];
    let grid = board[i];
    gridDiv.dataset.yValue = grid.y;
    gridDiv.dataset.xValue = grid.x;
    gridDiv.dataset.occupied = grid.occupied;
    gridDiv.dataset.shot = grid.shot;
    gridDiv.innerHTML = "";
    if (grid.ship !== null) {
      let shipType = grid.ship.constructor.name;
      gridDiv.dataset.shipType = shipType;
      let shipGridImg = elementFactory("img", "ship-grid-img");
      shipGridImg.domElement.dataset.shipType = grid.ship.constructor.name;
      gridDiv.appendChild(shipGridImg.domElement);
      if (grid.orientation === "vertical") {
        shipGridImg.domElement.classList.add("vertical-grid");
      }
      if (grid.readHeadNode()) {
        gridDiv.dataset.headNode = grid.readHeadNode();
        shipGridImg.domElement.src = shipSprites[shipType].shipHead;
      } else if (grid.readEndNode()) {
        gridDiv.dataset.endNode = grid.readEndNode();
        shipGridImg.domElement.src = shipSprites[shipType].shipEnd;
      } else {
        shipGridImg.domElement.src = shipSprites[shipType].shipMid;
      }
    } else {
      gridDiv.removeAttribute("data-ship-type");
      gridDiv.removeAttribute("data-head-node");
      gridDiv.removeAttribute("data-end-node");
    }
  }
};

export default rerenderGrids;
