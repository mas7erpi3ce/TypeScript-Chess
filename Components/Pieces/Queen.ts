import { Piece } from "./Piece";
import { Color } from "../../Enums/Color";
import { Cell } from "../Cell";
import { PieceType } from "../../Enums/PieceType";
import { Direction } from "../../Enums/Direction";
import { Table } from "../Table";

const queensMoveInstructions = [
    [Direction.STRAIGHT_UP],
    [Direction.STRAIGHT_RIGHT],
    [Direction.STRAIGHT_DOWN],
    [Direction.STRAIGHT_LEFT],
    [Direction.STRAIGHT_UP_RIGHT],
    [Direction.STRAIGHT_RIGHT_DOWN],
    [Direction.STRAIGHT_DOWN_LEFT],
    [Direction.STRAIGHT_LEFT_UP]
];

export class Queen extends Piece {

    constructor(color: Color, cell: Cell, table: Table) {
        super(color, PieceType.QUEEN, cell, queensMoveInstructions, table);
    }
}