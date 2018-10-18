
import { Piece } from "./Piece";
import { Direction } from "../Enum/Direction";
import { Color } from "../Enum/Color";
import { Cell } from "./Cell";
import { PieceType } from "../Enum/PieceType";
import { Table } from "./Table";

const rooksMoveInstructions: Direction[][] = [
    [Direction.STRAIGHT_UP],
    [Direction.STRAIGHT_RIGHT],
    [Direction.STRAIGHT_DOWN],
    [Direction.STRAIGHT_LEFT]
];

export class Rook extends Piece {

    constructor(color: Color, cell: Cell, table: Table) {
        super(color, PieceType.ROOK, cell, rooksMoveInstructions, table);
    }
}
