import { playerBoard, computerBoard } from "./index";
const checkWinner = () => {
  if (playerBoard.allSunk() === true) {
    alert("All your ships are sunk! Computer wins");
  } else if (computerBoard.allSunk() === true) {
    alert("All opponent's ships have been sunk. Player wins!");
  }
};

export default checkWinner;
