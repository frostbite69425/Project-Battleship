import playAgainModal from "../../components/playAgainModal.component.js";
import initPage from "../../services/ui services/initPage.service.js";

const winScreen = () => {
  const content = document.querySelector(".content");
  const playAgain = playAgainModal();

  content.append(playAgain);
  playAgain.showModal();

  const playAgainBtn = document.querySelector(".play-again-btn");
  playAgainBtn.addEventListener("click", () => {
    initPage();
  });
};

export default winScreen;
