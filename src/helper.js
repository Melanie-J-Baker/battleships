import { playerBoard, computerBoard } from "./index";

const checkWinner = () => {
  if (playerBoard.allSunk() === true) {
    return "player";
  } else if (computerBoard.allSunk() === true) {
    return "computer";
  } else {
    return null;
  }
};

export default checkWinner;
