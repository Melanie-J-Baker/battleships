import { Gameboard } from "./gameboard";

export interface Player {
  availableMoves: string[];
  lastHit: number | null;
  attack: (board: Gameboard, target: string) => void;
  playerMove: (event: MouseEvent, computerBoard: Gameboard) => void;
  computerMove: (board: Gameboard) => void;
}
