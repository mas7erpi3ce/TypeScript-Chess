
import { Piece } from "./Piece";
import { Color } from "../../Enum/Color";
import { Cell } from "../Cell";
import { PieceType } from "../../Enum/PieceType";
import { Direction } from "../../Enum/Direction";
import { Table } from "../Table";

const pawnsMoveInstructions = (color: Color): Direction[][] => [
    color === Color.BLACK ? [Direction.ONE_DOWN] : [Direction.ONE_UP]
];

export class Pawn extends Piece {

    hasMoved: boolean;

    constructor(color: Color, cell: Cell, table: Table) {
        super(color, PieceType.PAWN, cell, pawnsMoveInstructions(color), table);
        this.hasMoved = false;
    }
}
