import elementFactory from "../../utils/ui utils/elementFactory.utility.js";
import shipHolder from "../../components/shipHolder.component.js";
import board from "../../components/board.component.js";
import * as buttons from "../../components/buttons.component.js";
import randomiseSetup from "../app services/randomiseSetup.service.js";

const setupPage = (game, activePlayer = game.playerOne) => {
  const content = document.querySelector(".content");
  while (content.lastChild) {
    content.removeChild(content.firstChild);
  }
  const singlePlayer = game.gameMode;

  const shipContainer = shipHolder();
  const boardContainer = board(game.playerOne);
  const buttonDiv = elementFactory("div", "btn-div container");

  const randomiseBtn = buttons.randomiseBtn();
  const savePositionBtn = buttons.savePositionBtn();

  buttonDiv.domElement.append(randomiseBtn, savePositionBtn);

  randomiseBtn.addEventListener("click", () => {
    randomiseSetup(game, activePlayer);
  });

  if (!singlePlayer) {
    setupPage(game, game.playerTwo);
  }

  content.append(shipContainer, boardContainer, buttonDiv.domElement);
};

export default setupPage;
