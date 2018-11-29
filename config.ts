
import { Color } from "./Enum/Color";
import { Rook } from "./Components/Pieces/Rook";
import { Piece } from "./Components/Pieces/Piece";
import { Cell } from "./Components/Cell";
import { Table } from "./Components/Table";
import { Bishop } from "./Components/Pieces/Bishop";
import { Knight } from "./Components/Pieces/Knight";
import { King } from "./Components/Pieces/King";
import { Queen } from "./Components/Pieces/Queen";

export const figures: ((color: Color, cell: Cell, table: Table) => Piece)[] = [

    (color: Color, cell: Cell, table: Table) => new Rook(color, cell, table),
    (color: Color, cell: Cell, table: Table) => new Knight(color, cell, table),
    (color: Color, cell: Cell, table: Table) => new Bishop(color, cell, table),
    (color: Color, cell: Cell, table: Table) => color === Color.WHITE ? new King(color, cell, table) : new Queen(color, cell, table),
    (color: Color, cell: Cell, table: Table) => color === Color.WHITE ? new Queen(color, cell, table) : new King(color, cell, table),
    (color: Color, cell: Cell, table: Table) => new Bishop(color, cell, table),
    (color: Color, cell: Cell, table: Table) => new Knight(color, cell, table),
    (color: Color, cell: Cell, table: Table) => new Rook(color, cell, table)

]
