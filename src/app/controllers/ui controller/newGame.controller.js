import toggleClass from "../../utils/ui utils/toggleClass.utility.js";
import Game from "../app controller/gameController.controller.js";
import setupPage from "../../services/ui services/setupPage.service.js";

const newGameController = () => {
  const newGameBtn = document.querySelector(".new-game-btn");
  const singlePlayerBtn = document.querySelector(".single-player-btn");
  const multiPlayerBtn = document.querySelector(".multiplayer-btn");

  newGameBtn.addEventListener("click", () => {
    toggleClass("hidden", newGameBtn, singlePlayerBtn, multiPlayerBtn);
  });

  singlePlayerBtn.addEventListener("click", () => {
    const game = new Game(true);
    setupPage(game);
  });

  multiPlayerBtn.addEventListener("click", () => {
    const game = new Game(false);
    setupPage(game);
  });
};

export default newGameController;
