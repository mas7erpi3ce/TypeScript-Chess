
import { Color } from "./Enum/Color";
import { Rook } from "./Components/Rook";
import { Piece } from "./Components/Piece";
import { Cell } from "./Components/Cell";
import { Table } from "./Components/Table";
import { Bishop } from "./Components/Bishop";
import { Knight } from "./Components/Knight";
import { King } from "./Components/King";
import { Queen } from "./Components/Queen";

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
