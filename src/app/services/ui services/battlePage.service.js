import elementFactory from "../../utils/ui utils/elementFactory.utility.js";
import board from "../../components/board.component.js";
import rerenderBoards from "./rerenderBoards.service.js";
import gameFlow from "../../controllers/app controller/gameFlow.controller.js";
import * as buttons from "../../components/buttons.component.js";

const battlePage = (game) => {
  const content = document.querySelector(".content");
  while (content.lastChild) {
    content.removeChild(content.firstChild);
  }

  const singlePlayer = game.gameMode;

  const phaseDiv = elementFactory("h2", "phase-header");
  phaseDiv.insertText("Battle phase");

  const turnDiv = elementFactory("div", "turn-div");

  const playerOneBoard = board(game.attacker(), "board-one");
  const playerTwoBoard = board(game.defender(), "board-two");

  content.append(
    phaseDiv.domElement,
    turnDiv.domElement,
    playerOneBoard,
    playerTwoBoard,
  );
  if (!singlePlayer) {
    const passDeviceDiv = elementFactory("div", "pass-device-div");
    passDeviceDiv.insertText(
      "Press the pass device button to hide your screen form your opponent!",
    );
    content.append(passDeviceDiv.domElement);
    const passDeviceButton = buttons.passDeviceBtn();
    const showBoardsBtn = buttons.showBoardsBtn();
    content.append(passDeviceButton, showBoardsBtn);
  }

  rerenderBoards(game);
  gameFlow(game, singlePlayer);
};

export default battlePage;
