import elementFactory from "../utils/ui utils/elementFactory.utility.js";

const board = (player) => {
  const board = player.playerBoard();
  const parentBoardDiv = elementFactory("div", "parent-board-div");
  const boardNamePara = elementFactory("p", "board-name para");
  boardNamePara.insertText(`${player.name}'s Board`);
  const gridHolder = elementFactory("div", "grid-holder");
  for (let grid of board) {
    let gridDiv = elementFactory("div", "grid-div");
    gridDiv.domElement.dataset.xValue = grid.x;
    gridDiv.domElement.dataset.yValue = grid.y;
    gridDiv.domElement.dataset.occupied = grid.occupied;
    gridDiv.domElement.dataset.shot = grid.shot;
    if (grid.ship !== null) {
      gridDiv.domElement.dataset.shipType = grid.ship;
      if (grid.readHeadNode()) {
        gridDiv.domElement.dataset.headNode = grid.readHeadNode();
      } else if (grid.readEndNode()) {
        gridDiv.domElement.dataset.endNode = grid.readEndNode();
      }
    }
    gridHolder.domElement.appendChild(gridDiv.domElement);
  }

  parentBoardDiv.domElement.append(
    gridHolder.domElement,
    boardNamePara.domElement,
  );

  return parentBoardDiv.domElement;
};

export default board;
