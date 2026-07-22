import * as shipTypes from "../utils/app utils/shipTypeClass.utility.js";
import elementFactory from "../utils/ui utils/elementFactory.utility.js";
import BattleshipIcon from "../../assets/icons/Battleship.png";
import CarrierIcon from "../../assets/icons/Carrier.png";
import DestroyerIcon from "../../assets/icons/Destroyer.png";
import PatrolBoatIcon from "../../assets/icons/PatrolBoat.png";
import SubmarineIcon from "../../assets/icons/Submarine.png";

const shipIcons = {
  Battleship: BattleshipIcon,
  Carrier: CarrierIcon,
  Destroyer: DestroyerIcon,
  PatrolBoat: PatrolBoatIcon,
  Submarine: SubmarineIcon,
};

const shipHolder = () => {
  const shipHolderParentDiv = elementFactory("div", "ship-holder-parent");
  const shipHolderDiv = elementFactory("div", "ship-holder-div container");
  const shipHolderPara = elementFactory("p", "ship-holder-para para");
  shipHolderPara.insertText("Your ships");
  const shipArray = Object.keys(shipTypes);
  for (let ship of shipArray) {
    let shipHolder = elementFactory("div", "ship-holder");
    let shipNamePara = elementFactory("p", "ship-name para");
    shipNamePara.insertText(`${ship}`);
    let shipIcon = elementFactory("img", "ship-icon");
    shipIcon.domElement.src = shipIcons[ship];
    shipIcon.domElement.dataset.shipType = ship;
    shipHolder.domElement.append(shipNamePara.domElement, shipIcon.domElement);
    shipHolderDiv.domElement.appendChild(shipHolder.domElement);
  }
  shipHolderParentDiv.domElement.append(
    shipHolderPara.domElement,
    shipHolderDiv.domElement,
  );

  return shipHolderParentDiv.domElement;
};

export default shipHolder;
