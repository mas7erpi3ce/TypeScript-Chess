import { Piece } from "../Components/Pieces/Piece";
import { Cell } from "../Components/Cell";

export interface GameHistory {
  takenBy: Piece;
  fromCell: Cell;
  toCell: Cell;
  taken?: Piece;
}
