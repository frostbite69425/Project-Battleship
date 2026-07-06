import elementFactory from "../utils/ui utils/elementFactory.utility.js";

const turnBar = (turn, playerName) => {
  const turnDiv = elementFactory("div", "turn-div player-interface");
  const turnPara = elementFactory("p", "turn-para para");
  const namePara = elementFactory("p", "name-para para");

  turnDiv.setChildren(turnPara, namePara);
  turnPara.insertText(`Turn: ${turn}`);
  namePara.insertText(`${playerName}'s turn`);

  return turnDiv.domElement;
};

export default turnBar;
