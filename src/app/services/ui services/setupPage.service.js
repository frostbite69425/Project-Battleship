import elementFactory from "../../utils/ui utils/elementFactory.utility.js";
import shipHolder from "../../components/shipHolder.component.js";
import board from "../../components/board.component.js";
import * as buttons from "../../components/buttons.component.js";
import randomiseSetup from "../app services/randomiseSetup.service.js";
import battlePage from "./battlePage.service.js";
import rerenderGrids from "./rerenderGrids.service.js";

const setupPage = (game, activePlayer = game.playerOne) => {
  const content = document.querySelector(".content");
  while (content.lastChild) {
    content.removeChild(content.firstChild);
  }

  const singlePlayer = game.gameMode;

  const shipContainer = shipHolder();
  const boardContainer = board(activePlayer);
  const buttonDiv = elementFactory("div", "btn-div container");

  const randomiseBtn = buttons.randomiseBtn();
  const savePositionBtn = buttons.savePositionBtn();

  buttonDiv.domElement.append(randomiseBtn, savePositionBtn);

  randomiseBtn.addEventListener("click", () => {
    randomiseSetup(game, activePlayer);
    rerenderGrids(activePlayer.playerBoard());
  });

  savePositionBtn.addEventListener("click", () => {
    const playerOneSetup = game.playerOneSetup();
    const playerTwoSetup = game.playerTwoSetup();
    if (
      activePlayer == game.playerOne &&
      singlePlayer == true &&
      playerOneSetup
    ) {
      battlePage(game);
    } else if (
      activePlayer == game.playerOne &&
      singlePlayer == false &&
      playerOneSetup
    ) {
      setupPage(game, game.playerTwo);
    } else if (playerTwoSetup) {
      battlePage(game);
    } else {
      console.error("You need to setup your ships first!");
    }
  });

  content.append(shipContainer, boardContainer, buttonDiv.domElement);
};

export default setupPage;
