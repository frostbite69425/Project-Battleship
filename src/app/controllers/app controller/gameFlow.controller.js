import rerenderBoards from "../../services/ui services/rerenderBoards.service.js";
import botAI from "../../services/app services/botAI.service.js";
import notification from "../../services/ui services/notification.service.js";
import passDeviceController from "../ui controller/passDevice.controller.js";

const gameFlow = (game, singlePlayer = true) => {
  const turnDiv = document.querySelector(".turn-div");
  turnDiv.textContent = "";
  turnDiv.textContent = `Turn: ${game.getTurn()}`;

  const gridDivs = document.querySelectorAll(".grid-div");
  passDeviceController(game);

  gridDivs.forEach((grid) => {
    grid.addEventListener("click", () => {
      turnDiv.textContent = "";
      turnDiv.textContent = `Turn: ${game.getTurn()}`;
      if (game.attacker().name !== grid.dataset.playerName) {
        let xValue = grid.dataset.xValue;
        let yValue = Number(grid.dataset.yValue);
        if (!game) {
          // CONTINUE FROM HERE
          try {
            if (singlePlayer) {
              game.playRound([xValue, yValue]);
              rerenderBoards(game);
            } else {
              let currentPlayer = game.attacker().name;
              if (game.passStatus) {
                game.playRound([xValue, yValue]);
              }
              let nextPlayer = game.attacker().name;
              if (currentPlayer !== nextPlayer) {
                game.togglePass();
                rerenderBoards(game, true);
              } else {
                rerenderBoards(game);
              }
            }

            if (game.attackerWin()) {
              notification(`${game.attacker().name} wins!`, "info");
              const passDeviceBtn = document.querySelector(".pass-device-btn");
              passDeviceBtn.classList.toggle("hidden");
            }
          } catch (error) {
            notification(error, "danger");
          }

          if (game.attacker().type === "computer") {
            while (game.attacker().type === "computer" && !game.attackerWin()) {
              let botCoords = botAI(game.defender().playerBoard());
              game.playRound(botCoords);
              rerenderBoards(game);

              if (game.attackerWin()) {
                notification(`${game.attacker().name} wins!`);
              }
            }
          }
        } else {
          notification(`${game.attacker().name} wins!`, "info");
        }
      } else {
        if (singlePlayer) {
          notification("Click on the opponent's board to attack them!", "info");
        } else {
          notification(
            "Pass the device to your opponent! Your turn is over!",
            "info",
          );
        }
      }
    });
  });
};
export default gameFlow;
