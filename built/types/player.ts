import { Gameboard } from "../types/gameboard";

export interface Player {
  availableMoves: string[];
  lastHitIndex: number | null;
  attack: (board: Gameboard, target: string) => void;
  randomAttack: (board: Gameboard) => void;
  playerMove: (event: MouseEvent) => void;
  computerMove: () => void;
}
