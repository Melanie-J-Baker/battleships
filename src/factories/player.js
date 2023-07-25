// 3. Create Player.
// a) Players can take turns playing the game by attacking the enemy Gameboard.
// b) The game is played against the computer, so make the computer capable of making random plays.
// AI does not have to be smart, but should know whether or not a given move is legal. (i.e. it shouldnt shoot the same coordinate twice).
import { player, computer, playerBoard, computerBoard } from "../index";
import {
  renderComputerBoard,
  renderPlayerBoard,
  addSquareEventListeners,
  removeSquareEventListeners,
  infoPlayerMove,
  infoComputerMove,
  infoRepeatMove,
  infoPlayerWin,
  infoComputerWin,
} from "../DOM";
import { create2dArray, findNeighbours } from "../helper";

const allMoves = [
  "1,1",
  "1,2",
  "1,3",
  "1,4",
  "1,5",
  "1,6",
  "1,7",
  "1,8",
  "1,9",
  "1,10",
  "2,1",
  "2,2",
  "2,3",
  "2,4",
  "2,5",
  "2,6",
  "2,7",
  "2,8",
  "2,9",
  "2,10",
  "3,1",
  "3,2",
  "3,3",
  "3,4",
  "3,5",
  "3,6",
  "3,7",
  "3,8",
  "3,9",
  "3,10",
  "4,1",
  "4,2",
  "4,3",
  "4,4",
  "4,5",
  "4,6",
  "4,7",
  "4,8",
  "4,9",
  "4,10",
  "5,1",
  "5,2",
  "5,3",
  "5,4",
  "5,5",
  "5,6",
  "5,7",
  "5,8",
  "5,9",
  "5,10",
  "6,1",
  "6,2",
  "6,3",
  "6,4",
  "6,5",
  "6,6",
  "6,7",
  "6,8",
  "6,9",
  "6,10",
  "7,1",
  "7,2",
  "7,3",
  "7,4",
  "7,5",
  "7,6",
  "7,7",
  "7,8",
  "7,9",
  "7,10",
  "8,1",
  "8,2",
  "8,3",
  "8,4",
  "8,5",
  "8,6",
  "8,7",
  "8,8",
  "8,9",
  "8,10",
  "9,1",
  "9,2",
  "9,3",
  "9,4",
  "9,5",
  "9,6",
  "9,7",
  "9,8",
  "9,9",
  "9,10",
  "10,1",
  "10,2",
  "10,3",
  "10,4",
  "10,5",
  "10,6",
  "10,7",
  "10,8",
  "10,9",
  "10,10",
];

const PlayerFactory = function () {
  const availableMoves = [
    "1,1",
    "1,2",
    "1,3",
    "1,4",
    "1,5",
    "1,6",
    "1,7",
    "1,8",
    "1,9",
    "1,10",
    "2,1",
    "2,2",
    "2,3",
    "2,4",
    "2,5",
    "2,6",
    "2,7",
    "2,8",
    "2,9",
    "2,10",
    "3,1",
    "3,2",
    "3,3",
    "3,4",
    "3,5",
    "3,6",
    "3,7",
    "3,8",
    "3,9",
    "3,10",
    "4,1",
    "4,2",
    "4,3",
    "4,4",
    "4,5",
    "4,6",
    "4,7",
    "4,8",
    "4,9",
    "4,10",
    "5,1",
    "5,2",
    "5,3",
    "5,4",
    "5,5",
    "5,6",
    "5,7",
    "5,8",
    "5,9",
    "5,10",
    "6,1",
    "6,2",
    "6,3",
    "6,4",
    "6,5",
    "6,6",
    "6,7",
    "6,8",
    "6,9",
    "6,10",
    "7,1",
    "7,2",
    "7,3",
    "7,4",
    "7,5",
    "7,6",
    "7,7",
    "7,8",
    "7,9",
    "7,10",
    "8,1",
    "8,2",
    "8,3",
    "8,4",
    "8,5",
    "8,6",
    "8,7",
    "8,8",
    "8,9",
    "8,10",
    "9,1",
    "9,2",
    "9,3",
    "9,4",
    "9,5",
    "9,6",
    "9,7",
    "9,8",
    "9,9",
    "9,10",
    "10,1",
    "10,2",
    "10,3",
    "10,4",
    "10,5",
    "10,6",
    "10,7",
    "10,8",
    "10,9",
    "10,10",
  ];

  let lastHitIndex = null;

  const attack = (board, target) => {
    if (player.availableMoves.includes(target)) {
      board.receiveAttack(target);
      const index = player.availableMoves.indexOf(target);
      if (index > -1) {
        player.availableMoves.splice(index, 1);
      }
    } else {
      infoRepeatMove();
      removeSquareEventListeners();
      renderComputerBoard(computerBoard);
      playerMove();
    }
  };
  const randomAttack = (board) => {
    let index;
    if (lastHitIndex === null) {
      const randomTarget =
        computer.availableMoves[
          Math.floor(Math.random() * computer.availableMoves.length)
        ];
      board.receiveAttack(randomTarget);
      if (board.hits.includes(randomTarget)) {
        lastHitIndex = allMoves.indexOf(randomTarget);
      } else {
        lastHitIndex = null;
      }
      let index = computer.availableMoves.indexOf(randomTarget);
      if (index > -1) {
        // only splice array when item is found
        computer.availableMoves.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else if (lastHitIndex !== null) {
      let array2d = create2dArray();
      let neighbours = findNeighbours(lastHitIndex, array2d);
      const neighboursArray = Object.values(neighbours);
      const validNeighbours = neighboursArray.filter((x) => x !== undefined);
      let neighbourIndex =
        validNeighbours[Math.floor(Math.random() * validNeighbours.length)];
      let neighbourCoords = allMoves[neighbourIndex];
      board.receiveAttack(neighbourCoords);
      if (board.hits.includes(neighbourCoords)) {
        lastHitIndex = allMoves.indexOf(neighbourCoords);
      } else {
        lastHitIndex = null;
      }
      index = computer.availableMoves.indexOf(neighbourCoords);
      if (index > -1) {
        // only splice array when item is found
        computer.availableMoves.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  };

  const playerMove = (event) => {
    player.attack(computerBoard, event.target.id.slice(1));
    renderComputerBoard(computerBoard);
    removeSquareEventListeners();
    if (computerBoard.allSunk() === true) {
      infoPlayerWin();
    } else {
      infoComputerMove();
      setTimeout(computerMove, 1000);
    }
  };

  const computerMove = () => {
    randomAttack(playerBoard);
    renderPlayerBoard(playerBoard);
    if (playerBoard.allSunk() === true) {
      infoComputerWin();
      removeSquareEventListeners();
    } else {
      infoPlayerMove();
      addSquareEventListeners();
    }
  };
  return {
    attack,
    randomAttack,
    availableMoves,
    playerMove,
    computerMove,
    lastHitIndex,
  };
};

export default PlayerFactory;
