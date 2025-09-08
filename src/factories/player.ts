import { Gameboard } from "../types/gameboard";
import { findNeighbours } from "../helper";
import { Player } from "../types/player";
import { is } from "@babel/types";

export function PlayerFactory(): Player {
  const availableMoves: string[] = [
    ...Array.from({ length: 10 }, (_, x) =>
      Array.from({ length: 10 }, (_, y) => `${x + 1},${y + 1}`),
    ).flat(),
  ];

  let lastHitCoord: string | null = null;

  const attack = (board: Gameboard, target: string) => {
    if (!availableMoves.includes(target)) return "That move is not available";
    board.receiveAttack(target);
    const index = availableMoves.indexOf(target);
    if (index > -1) availableMoves.splice(index, 1);
  };

  const computerMove = (board: Gameboard): void => {
    if (lastHitCoord === null) {
      // Pick a random square to attack
      const randomTarget =
        availableMoves[Math.floor(Math.random() * availableMoves.length)];
      board.receiveAttack(randomTarget);

      if (board.hits.includes(randomTarget)) {
        lastHitCoord = randomTarget; // Store the last hit coordinate
      }

      const moveIndex = availableMoves.indexOf(randomTarget);
      if (moveIndex > -1) availableMoves.splice(moveIndex, 1);
    } else {
      // Find neigbours of last hit
      const [xStr, yStr] = lastHitCoord.split(",");
      const x = parseInt(xStr, 10);
      const y = parseInt(yStr, 10);
      const neighbours = findNeighbours(x, y);

      // Only orthogonal neighbours (up/down/left/right)
      const possibleCoords = [
        neighbours.right,
        neighbours.left,
        neighbours.top,
        neighbours.bottom,
      ].filter((c): c is string => !!c && availableMoves.includes(c));

      if (possibleCoords.length > 0) {
        const target =
          possibleCoords[Math.floor(Math.random() * possibleCoords.length)];
        board.receiveAttack(target);
        if (board.hits.includes(target)) {
          lastHitCoord = target; // Chain hunting if hit again
        } else {
          lastHitCoord = null; // Reset if miss
        }

        const moveIndex = availableMoves.indexOf(target);
        if (moveIndex > -1) availableMoves.splice(moveIndex, 1);
      } else {
        // No valid neighbours remaining - fall back to random
        lastHitCoord = null;
        computerMove(board);
      }
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
    lastHitCoord,
  };
}
