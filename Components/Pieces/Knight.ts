
import { Piece } from "./Piece";
import { Direction } from "../../Enums/Direction";
import { Color } from "../../Enums/Color";
import { Cell } from "../Cell";
import { PieceType } from "../../Enums/PieceType";
import { Table } from "../Table";

const knightsMoveInstructions: Direction[][] = [
    [Direction.ONE_UP, Direction.ONE_UP, Direction.ONE_LEFT],
    [Direction.ONE_UP, Direction.ONE_UP, Direction.ONE_RIGHT],
    [Direction.ONE_RIGHT, Direction.ONE_RIGHT, Direction.ONE_UP],
    [Direction.ONE_RIGHT, Direction.ONE_RIGHT, Direction.ONE_DOWN],
    [Direction.ONE_DOWN, Direction.ONE_DOWN, Direction.ONE_LEFT],
    [Direction.ONE_DOWN, Direction.ONE_DOWN, Direction.ONE_RIGHT],
    [Direction.ONE_LEFT, Direction.ONE_LEFT, Direction.ONE_UP],
    [Direction.ONE_LEFT, Direction.ONE_LEFT, Direction.ONE_DOWN],
];

export class Knight extends Piece {

    constructor(color: Color, cell: Cell, table: Table) {
        super(color, PieceType.KING, cell, knightsMoveInstructions, table);
    }
}
