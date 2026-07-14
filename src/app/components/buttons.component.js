import elementFactory from "../utils/ui utils/elementFactory.utility.js";

const randomiseBtn = () => {
  const randomiseBtn = elementFactory("button", "randomise-btn btn");
  randomiseBtn.domElement.type = "button";
  randomiseBtn.insertText("Randomise");

  return randomiseBtn.domElement;
};

const savePositionBtn = () => {
  const savePositionBtn = elementFactory("button", "save-position-btn btn");
  savePositionBtn.domElement.type = "button";
  savePositionBtn.insertText("Save positions");

  return savePositionBtn.domElement;
};

const newGameBtn = () => {
  const newGameBtn = elementFactory("button", "new-game-btn btn");
  newGameBtn.domElement.type = "button";
  newGameBtn.insertText("New Game");

  return newGameBtn.domElement;
};

const playAgainBtn = () => {
  const playAgainBtn = elementFactory("button", "play-again-btn btn");
  playAgainBtn.domElement.type = "button";
  playAgainBtn.insertText("Play Again");

  return playAgainBtn.domElement;
};

const singlePlayerBtn = () => {
  const singlePlayerBtn = elementFactory(
    "button",
    "single-player-btn btn hidden",
  );
  singlePlayerBtn.domElement.type = "button";
  singlePlayerBtn.insertText("Single Player Mode");

  return singlePlayerBtn.domElement;
};

const multiplayerBtn = () => {
  const multiplayerBtn = elementFactory("button", "multiplayer-btn btn hidden");
  multiplayerBtn.domElement.type = "button";
  multiplayerBtn.insertText("Multiplayer Mode");

  return multiplayerBtn.domElement;
};

const clearBoardBtn = () => {
  const clearBoardBtn = elementFactory("button", "clear-board-btn btn");
  clearBoardBtn.domElement.type = "button";
  clearBoardBtn.insertText("Clear Board");

  return clearBoardBtn.domElement;
};

export {
  randomiseBtn,
  savePositionBtn,
  newGameBtn,
  playAgainBtn,
  singlePlayerBtn,
  multiplayerBtn,
  clearBoardBtn,
};
