
import { Piece } from "./Pieces/Piece";
import { GameHistory } from "./Table";
import { Direction } from "../Enum/Direction";

interface CellParams {
    left: Cell;
    right: Cell;
    up: Cell;
    down: Cell;
    inside: Piece;
    registerPiece: (piece: Piece) => void;
    unregisterPiece: () => void;
    getNextCell: (direction: Direction) => Cell;

}
////// MAYBE TABLE NOT NEEDED
export class Cell implements CellParams {

    static undoMove(lastMove: GameHistory): void {
        lastMove.fromCell.registerPiece(lastMove.takenBy);
        typeof lastMove.taken === "undefined" ? lastMove.toCell.unregisterPiece() : lastMove.taken.reborn();
    }

    left: Cell;
    right: Cell;
    up: Cell;
    down: Cell;
    inside: Piece;


    constructor(left?: Cell, right?: Cell, up?: Cell, down?: Cell) {
        this.left = left;
        this.right = right;
        this.up = up;
        this.down = down;
        this.inside = undefined;
    }

    registerPiece(piece: Piece): Cell {
        this.inside = piece;
        return this;
    }

    unregisterPiece(): void {
        this.inside = undefined;
    }

    getNextCell(direction: Direction): Cell {
        switch (direction) {
            case Direction.ONE_DOWN:
                return this.down;
            case Direction.ONE_LEFT:
                return this.left;
            case Direction.ONE_RIGHT:
                return this.right;
            case Direction.ONE_UP:
                return this.up;
        }
    }

}
