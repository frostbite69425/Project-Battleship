import elementFactory from "../utils/ui utils/elementFactory.utility.js";
const validX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const board = (player, id = false) => {
  const board = player.playerBoard();
  const parentBoardDiv = elementFactory("div", "parent-board-div");
  const boardNamePara = elementFactory("p", "board-name para");
  boardNamePara.insertText(`${player.name}'s Board`);
  const gridYCoords = elementFactory("div", "grid-y-coords");
  const gridXCoords = elementFactory("div", "grid-x-coords");
  const bottomRowHolder = elementFactory("div", "bottom-container");
  for (let i = 0; i < 10; i++) {
    let xCoordDiv = elementFactory("div", "grid-x-coord-div");
    let yCoordDiv = elementFactory("div", "grid-y-coord-div");
    yCoordDiv.insertText(`${validX[i]}`);
    xCoordDiv.insertText(`${i + 1}`);
    gridXCoords.domElement.append(xCoordDiv.domElement);
    gridYCoords.domElement.append(yCoordDiv.domElement);
  }
  const gridHolder = elementFactory("div", "grid-holder");
  for (let grid of board) {
    let gridDiv = elementFactory("div", "grid-div");
    if (id) {
      gridDiv.domElement.id = id;
      gridDiv.domElement.dataset.playerName = player.name;
    }
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

  bottomRowHolder.domElement.append(
    gridYCoords.domElement,
    gridHolder.domElement,
  );

  parentBoardDiv.domElement.append(
    boardNamePara.domElement,
    gridXCoords.domElement,
    bottomRowHolder.domElement,
  );

  return parentBoardDiv.domElement;
};

export default board;
