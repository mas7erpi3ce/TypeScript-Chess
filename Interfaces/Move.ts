import { Piece } from "../Components/Pieces/Piece";
import { PossibleMove } from "./PossibleMove";

export interface Move {
  piece: Piece;
  possibleMove: PossibleMove;
}
