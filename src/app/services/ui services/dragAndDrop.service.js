import rerenderGrids from "./rerenderGrids.service.js";

const dragAndDrop = (game, player) => {
  function dragStartHandler(ev) {
    ev.dataTransfer.clearData();
    ev.dataTransfer.setData("text/plain", ev.target.dataset.shipType);
  }

  const shipDragIcons = document.querySelectorAll(".ship-holder > img");

  shipDragIcons.forEach((icon) => {
    icon.addEventListener("dragstart", dragStartHandler);
  });

  const gridList = document.querySelectorAll(".grid-div");

  gridList.forEach((grid) => {
    grid.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    grid.addEventListener("drop", (e) => {
      e.preventDefault();

      const shipType = e.dataTransfer.getData("text");

      const xCoord = grid.dataset.xValue;
      const yCoord = Number(grid.dataset.yValue);
      try {
        game.setup(player.name, [shipType, [xCoord, yCoord], "horizontal"]);
      } catch (error) {
        console.error(error);
        console.log(player.gameBoard.ships, player.gameBoard.shipsPlaced());
      }
      rerenderGrids(player.playerBoard());
    });
  });
};

export default dragAndDrop;
