import * as buttons from "../../components/buttons.component.js";
import elementFactory from "../../utils/ui utils/elementFactory.utility.js";
import newGameController from "../../controllers/ui controller/newGame.controller.js";

const initPage = () => {
  const content = document.querySelector(".content");
  const newGameBtn = buttons.newGameBtn();
  const playerModeHolder = elementFactory(
    "div",
    "player-mode-holder container",
  );
  const singlePlayerBtn = buttons.singlePlayerBtn();
  const multiPlayerBtn = buttons.multiplayerBtn();

  playerModeHolder.domElement.append(singlePlayerBtn, multiPlayerBtn);
  content.append(newGameBtn, playerModeHolder.domElement);

  newGameController();
};

export default initPage;
