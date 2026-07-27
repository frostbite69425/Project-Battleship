import battleEnd from "../../../assets/icons/battleEnd.png";
import battleMid from "../../../assets/icons/battleMid.png";
import battleHead from "../../../assets/icons/battleStart.png";
import carrierEnd from "../../../assets/icons/carrierEnd.png";
import carrierMid from "../../../assets/icons/carrierMid.png";
import carrierHead from "../../../assets/icons/carrierHead.png";
import destroyerEnd from "../../../assets/icons/destroyerEnd.png";
import destroyerMid from "../../../assets/icons/destroyerMid.png";
import destroyerHead from "../../../assets/icons/destroyerHead.png";
import subEnd from "../../../assets/icons/subEnd.png";
import subMid from "../../../assets/icons/subMid.png";
import subHead from "../../../assets/icons/subHead.png";
import patrolEnd from "../../../assets/icons/patrolEnd.png";
import patrolHead from "../../../assets/icons/patrolHead.png";
import hit from "../../../assets/icons/hit.png";

const shipSprites = {
  Battleship: {
    shipHead: battleHead,
    shipMid: battleMid,
    shipEnd: battleEnd,
  },

  Carrier: {
    shipHead: carrierHead,
    shipMid: carrierMid,
    shipEnd: carrierEnd,
  },

  Destroyer: {
    shipHead: destroyerHead,
    shipMid: destroyerMid,
    shipEnd: destroyerEnd,
  },

  Submarine: {
    shipHead: subHead,
    shipMid: subMid,
    shipEnd: subEnd,
  },

  PatrolBoat: {
    shipHead: patrolHead,
    shipEnd: patrolEnd,
  },

  hit: hit,
};

export default shipSprites;
