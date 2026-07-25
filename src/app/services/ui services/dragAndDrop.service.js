import rerenderGrids from "./rerenderGrids.service.js";
import dragStartHandler from "../../utils/ui utils/dragStartHandler.utility.js";
import notification from "./notification.service.js";

const validShips = [
  "Battleship",
  "Carrier",
  "Destroyer",
  "PatrolBoat",
  "Submarine",
];

const dragAndDrop = (game, player) => {
  const shipDragIcons = document.querySelectorAll(".ship-holder > img");

  shipDragIcons.forEach((icon) => {
    icon.addEventListener("dragstart", dragStartHandler);
  });

  const gridList = document.querySelectorAll(".grid-div");

  gridList.forEach((grid) => {
    grid.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    grid.addEventListener("dragstart", dragStartHandler);

    grid.addEventListener("drop", (e) => {
      e.preventDefault();

      const shipType = e.dataTransfer.getData("text");
      const dataString = e.dataTransfer.getData("custom-coords");
      const coords = JSON.parse(dataString);

      if (validShips.includes(shipType) && coords.xValue === undefined) {
        const xCoord = grid.dataset.xValue;
        const yCoord = Number(grid.dataset.yValue);

        try {
          game.setup(player.name, [shipType, [xCoord, yCoord], "horizontal"]);

          rerenderGrids(player.playerBoard());
        } catch (error) {
          notification(error, "danger");
        }
      } else if (validShips.includes(shipType) && coords.xValue !== undefined) {
        const xCoord = grid.dataset.xValue;
        const yCoord = Number(grid.dataset.yValue);

        const startX = coords.xValue;
        const startY = Number(coords.yValue);
        try {
          player.gameBoard.relocateShip(
            shipType,
            [startX, startY],
            [xCoord, yCoord],
            coords.orientation,
          );

          rerenderGrids(player.playerBoard());
        } catch (error) {
          notification(error, "danger");
        }
      }
    });
  });
};

export default dragAndDrop;
