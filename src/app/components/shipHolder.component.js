import * as shipTypes from "../utils/app utils/shipTypeClass.utility.js";
import elementFactory from "../utils/ui utils/elementFactory.utility.js";

const shipHolder = () => {
  const shipHolderParentDiv = elementFactory("div", "ship-holder-parent");
  const shipHolderDiv = elementFactory("div", "ship-holder-div container");
  const shipHolderPara = elementFactory("p", "ship-holder-para para");
  shipHolderPara.insertText("Your ships");
  const shipArray = Object.keys(shipTypes);
  for (let ship of shipArray) {
    let shipHolder = elementFactory("div", "ship-holder");
    shipHolder.domElement.dataset.length = ship.length;
    let shipNamePara = elementFactory("p", "ship-name para");
    shipNamePara.insertText(`${ship}`);
    shipHolder.domElement.appendChild(shipNamePara.domElement);
    shipHolderDiv.domElement.appendChild(shipHolder.domElement);
  }
  shipHolderParentDiv.domElement.appendChild(
    shipHolderPara.domElement,
    shipHolderDiv.domElement,
  );

  return shipHolderParentDiv.domElement;
};

export default shipHolder;
