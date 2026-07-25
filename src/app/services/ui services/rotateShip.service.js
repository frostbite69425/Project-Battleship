import rerenderGrids from "./rerenderGrids.service.js";
import notification from "./notification.service.js";
const rotateShip = (game, activePlayer) => {
  const gridList = document.querySelectorAll(".grid-div");

  gridList.forEach((grid) => {
    grid.addEventListener("click", (e) => {
      if (e.target.parentNode.dataset.occupied) {
        const xCoord = e.target.parentNode.dataset.xValue;
        const yCoord = Number(e.target.parentNode.dataset.yValue);
        try {
          activePlayer.gameBoard.rotateShip([xCoord, yCoord]);
          rerenderGrids(activePlayer.playerBoard());
        } catch (error) {
          notification(error, "danger");
        }
      }
    });
  });
};

export default rotateShip;
