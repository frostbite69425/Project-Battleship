import rerenderBoards from "../../services/ui services/rerenderBoards.service.js";

const passDeviceController = (game) => {
  const passDeviceBtn = document.querySelector(".pass-device-btn");
  const showBoardsBtn = document.querySelector(".show-boards-btn");
  const passDeviceDiv = document.querySelector(".pass-device-div");
  const gridDivs = document.querySelectorAll(".grid-div");

  passDeviceBtn.addEventListener("click", () => {
    if (game.passStatus === false) {
      passDeviceDiv.textContent =
        "Press the show boards button to render the boards again!";
      passDeviceBtn.classList.toggle("hidden");
      gridDivs.forEach((grid) => {
        grid.classList.toggle("hide-mask");
      });
      showBoardsBtn.classList.toggle("hidden");
    }
  });

  showBoardsBtn.addEventListener("click", () => {
    passDeviceDiv.textContent =
      "Press the pass device button to hide your screen form your opponent!";

    gridDivs.forEach((grid) => {
      grid.classList.toggle("hide-mask");
    });
    showBoardsBtn.classList.toggle("hidden");
    passDeviceBtn.classList.toggle("hidden");
    game.togglePass();
    rerenderBoards(game);
  });
};

export default passDeviceController;
