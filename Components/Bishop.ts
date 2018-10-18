
import { Piece } from "./Piece";
import { Color } from "../Enum/Color";
import { PieceType } from "../Enum/PieceType";
import { Direction } from "../Enum/Direction";
import { Cell } from "./Cell";
import { Table } from "./Table";

const bishopsMoveInstructions: Direction[][] = [
    [Direction.STRAIGHT_UP_RIGHT],
    [Direction.STRAIGHT_RIGHT_DOWN],
    [Direction.STRAIGHT_DOWN_LEFT],
    [Direction.STRAIGHT_LEFT_UP]
];

export class Bishop extends Piece {

    constructor(color: Color, cell: Cell, table: Table) {
        super(color, PieceType.BISHOP, cell, bishopsMoveInstructions, table);
    }

}