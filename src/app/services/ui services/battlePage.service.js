import elementFactory from "../../utils/ui utils/elementFactory.utility.js";
import board from "../../components/board.component.js";
import rerenderBoards from "./rerenderBoards.service.js";
import gameFlow from "../../controllers/app controller/gameFlow.controller.js";

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

  rerenderBoards(game);
  gameFlow(game);
};

export default battlePage;
