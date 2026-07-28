import rerenderBoards from "../../services/ui services/rerenderBoards.service.js";
import botAI from "../../services/app services/botAI.service.js";
import notification from "../../services/ui services/notification.service.js";

const gameFlow = (game, singlePlayer = true) => {
  const turnDiv = document.querySelector(".turn-div");
  turnDiv.textContent = "";
  turnDiv.textContent = `Turn: ${game.getTurn()}`;

  const gridDivs = document.querySelectorAll(".grid-div");
  if (singlePlayer) {
    gridDivs.forEach((grid) => {
      grid.addEventListener("click", () => {
        turnDiv.textContent = "";
        turnDiv.textContent = `Turn: ${game.getTurn()}`;
        if (game.attacker().name !== grid.dataset.playerName) {
          let xValue = grid.dataset.xValue;
          let yValue = Number(grid.dataset.yValue);
          if (!game.attackerWin()) {
            try {
              game.playRound([xValue, yValue]);
              rerenderBoards(game);

              if (game.attackerWin()) {
                notification(`${game.attacker().name} wins!`);
              }
            } catch (error) {
              notification(error, "danger");
            }

            if (game.attacker().type === "computer") {
              while (
                game.attacker().type === "computer" &&
                !game.attackerWin()
              ) {
                let botCoords = botAI(game.defender().playerBoard());
                console.log(botCoords);

                game.playRound(botCoords);
                rerenderBoards(game);

                if (game.attackerWin()) {
                  notification(`${game.attacker().name} wins!`);
                }
              }
            } else {
              // do the pass screen button functionality here
            }
          } else {
            notification(`${game.attacker().name} wins!`);
          }
        }
      });
    });
  } else {
    // disable the pass screen button

    gridDivs.forEach((grid) => {
      grid.addEventListener("click", () => {
        turnDiv.textContent = "";
        turnDiv.textContent = `Turn: ${game.getTurn()}`;
        if (game.attacker().name !== grid.dataset.playerName) {
          let xValue = grid.dataset.xValue;
          let yValue = Number(grid.dataset.yValue);
          game.playRound([xValue, yValue]);

          //   enable the pass device button
          // on click show the pass device screen, and on clicking a button on that page run rerenderBoards
          rerenderBoards(game);
        }
      });
    });
  }
};

export default gameFlow;
