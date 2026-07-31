import elementFactory from "../utils/ui utils/elementFactory.utility.js";
import * as buttons from "../components/buttons.component.js";

const playAgainModal = () => {
  const dialog = elementFactory("dialog", "play-again-modal modal");
  const playAgainPara = elementFactory("p", "play-again-para para");
  playAgainPara.insertText("Play again?");
  const playAgainBtn = buttons.playAgainBtn();

  dialog.domElement.append(playAgainPara.domElement, playAgainBtn);

  return dialog.domElement;
};

export default playAgainModal;
