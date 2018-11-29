import { Cell } from "../Components/Cell";
import { Piece } from "../Components/Pieces/Piece";

export interface PossibleMove {
  toCell: Cell;
  pieceToTake?: Piece;
}
