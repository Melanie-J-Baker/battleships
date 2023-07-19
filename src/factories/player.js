// 3. Create Player.
// a) Players can take turns playing the game by attacking the enemy Gameboard.
// b) The game is played against the computer, so make the computer capable of making random plays.
// AI does not have to be smart, but should know whether or not a given move is legal. (i.e. it shouldnt shoot the same coordinate twice).
import { player, computer, playerBoard, computerBoard } from "../index";
import {
  renderComputerBoard,
  renderPlayerBoard,
  repeatMove,
  addSquareEventListeners,
  removeSquareEventListeners,
} from "../DOM";

const PlayerFactory = function () {
  let playerTurn = false;
  const availableMoves = [
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "A9",
    "A10",
    "B1",
    "B2",
    "B3",
    "B4",
    "B5",
    "B6",
    "B7",
    "B8",
    "B9",
    "B10",
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
    "D1",
    "D2",
    "D3",
    "D4",
    "D5",
    "D6",
    "D7",
    "D8",
    "D9",
    "D10",
    "E1",
    "E2",
    "E3",
    "E4",
    "E5",
    "E6",
    "E7",
    "E8",
    "E9",
    "E10",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "G1",
    "G2",
    "G3",
    "G4",
    "G5",
    "G6",
    "G7",
    "G8",
    "G9",
    "G10",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "H7",
    "H8",
    "H9",
    "H10",
    "I1",
    "I2",
    "I3",
    "I4",
    "I5",
    "I6",
    "I7",
    "I8",
    "I9",
    "I10",
    "J1",
    "J2",
    "J3",
    "J4",
    "J5",
    "J6",
    "J7",
    "J8",
    "J9",
    "J10",
  ];
  const attack = (board, target) => {
    if (availableMoves.includes(target)) {
      board.receiveAttack(target);
      const index = availableMoves.indexOf(target);
      if (index > -1) {
        // only splice array when item is found
        availableMoves.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else {
      return "That move is not available";
    }
  };
  const randomAttack = (board) => {
    const randomTarget =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];
    board.receiveAttack(randomTarget);
    const index = availableMoves.indexOf(randomTarget);
    if (index > -1) {
      // only splice array when item is found
      availableMoves.splice(index, 1); // 2nd parameter means remove one item only
    }
  };

  const playerMove = (event) => {
    addSquareEventListeners();
    if (player.availableMoves.includes(event.target.id.slice(1))) {
      player.attack(computerBoard, event.target.id.slice(1));
      renderComputerBoard(computerBoard);
    } else {
      repeatMove();
    }
    removeSquareEventListeners();
    setTimeout(computerMove, 1000);
  };

  const computerMove = () => {
    randomAttack(playerBoard);
    renderPlayerBoard(playerBoard);
    player.playerMove();
  };
  return { attack, randomAttack, availableMoves, playerMove, computerMove };
};

export default PlayerFactory;
