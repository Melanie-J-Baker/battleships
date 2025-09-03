import { Gameboard } from "../types/gameboard";
import { findNeighbours } from "../helper";
import { Player } from "../types/player";

export function PlayerFactory(): Player {
  const availableMoves: string[] = [
    ...Array.from({ length: 10 }, (_, x) =>
      Array.from({ length: 10 }, (_, y) => `${x + 1},${y + 1}`),
    ).flat(),
  ];

  let lastHitIndex: number | null = null;

  const attack = (board: Gameboard, target: string) => {
    if (!availableMoves.includes(target)) return "That move is not available";
    board.receiveAttack(target);
    const index = availableMoves.indexOf(target);
    if (index > -1) availableMoves.splice(index, 1);
  };

  const computerMove = (board: Gameboard): void => {
    if (lastHitIndex === null) {
      const randomTarget =
        availableMoves[Math.floor(Math.random() * availableMoves.length)];
      board.receiveAttack(randomTarget);

      if (board.hits.includes(randomTarget)) {
        lastHitIndex = availableMoves.indexOf(randomTarget);
      } else {
        lastHitIndex = null;
      }

      const moveIndex = availableMoves.indexOf(randomTarget);
      if (moveIndex > -1) availableMoves.splice(moveIndex, 1);
    } else {
      // logic using findNeighbours
      const neighbours = findNeighbours(lastHitIndex);
      const neighboursArray = Object.values(neighbours).slice(0, 4); // up/down/left/right
      const validNeighbours = neighboursArray.filter(
        (x) => x !== undefined,
      ) as number[];
      const neighbourIndex =
        validNeighbours[Math.floor(Math.random() * validNeighbours.length)];
      const neighbourCoord = availableMoves[neighbourIndex];

      board.receiveAttack(neighbourCoord);
      lastHitIndex = board.hits.includes(neighbourCoord)
        ? availableMoves.indexOf(neighbourCoord)
        : null;

      const moveIndex = availableMoves.indexOf(neighbourCoord);
      if (moveIndex > -1) availableMoves.splice(moveIndex, 1);
    }
  };

  const playerMove = (event: MouseEvent, computerBoard: Gameboard) => {
    const target = event.target as HTMLElement;
    const targetCoord = target.id.slice(1);
    if (availableMoves.includes(targetCoord)) {
      attack(computerBoard, targetCoord);
    }
  };

  return {
    attack,
    playerMove,
    computerMove,
    availableMoves,
    lastHitIndex,
  };
}
