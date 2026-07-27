import elementFactory from "../utils/ui utils/elementFactory.utility.js";

const instructions = () => {
  const container = elementFactory("div", "container instructions");
  const header = elementFactory("h3", "instruction-header");
  header.insertText("Instructions");
  const list = elementFactory("ol", "instruction-list");
  const instructionOne = elementFactory("li", "list-item");
  instructionOne.insertText(
    "Drag the ship icons onto the board to place them.",
  );
  const instructionTwo = elementFactory("li", "list-item");
  instructionTwo.insertText(
    "Click the placed ships to rotate their orientations.",
  );

  const instructionThree = elementFactory("li", "list-item");
  instructionThree.insertText(
    "Drag the placed ship icons on the board in order to relocate them to a new position.",
  );
  const instructionFour = elementFactory("li", "list-item");
  instructionFour.insertText(
    "Use the Randomise button to randomise the ship placements.",
  );
  const instructionFive = elementFactory("li", "list-item");
  instructionFive.insertText("Use the clear button to clear your board.");
  const instructionSix = elementFactory("li", "list-item");
  instructionSix.insertText(
    "Use the save positions button to confirm your ship placements.",
  );

  list.domElement.append(
    instructionOne.domElement,
    instructionTwo.domElement,
    instructionThree.domElement,
    instructionFour.domElement,
    instructionFive.domElement,
    instructionSix.domElement,
  );

  container.domElement.append(header.domElement, list.domElement);
  return container.domElement;
};

export default instructions;
