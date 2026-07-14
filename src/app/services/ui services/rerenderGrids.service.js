import elementFactory from "../../utils/ui utils/elementFactory.utility.js";

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
      gridDiv.domElement.dataset.shipType = grid.ship;
    }
    gridHolder.appendChild(gridDiv.domElement);
  }
};

export default rerenderGrids;
