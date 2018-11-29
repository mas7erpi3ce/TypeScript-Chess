
import { Color } from "../../Enum/Color";
import { Cell } from "../Cell";
import { Direction } from "../../Enum/Direction";
import { PieceType } from "../../Enum/PieceType";
import { Table } from "../Table";


interface PieceParams {
    color: Color;
    type: PieceType;
    cell: Cell;
    blockedBy: BlockedBy[];
    moveInstructions: Direction[][];
    possibleMoves: PossibleMove[];
    table: Table;
    move: (move: PossibleMove) => void;
    calculateMoves: (startCell?: Cell) => PossibleMove[];
    die: () => void;
}

interface BlockedBy {
    threat: Piece;
    attackerTrack: Cell[];
}

export interface PossibleMove {
    toCell: Cell;
    pieceToTake?: Piece;
}


export abstract class Piece implements PieceParams {

    color: Color;
    type: PieceType;
    cell: Cell;
    blockedBy: BlockedBy[];
    moveInstructions: Direction[][];
    possibleMoves: PossibleMove[];
    table: Table;

    constructor(color: Color, type: PieceType, cell: Cell, moveInstructions: Direction[][], table: Table) {
        this.color = color;
        this.type = type;
        this.cell = cell;
        this.blockedBy = new Array<BlockedBy>();
        this.moveInstructions = moveInstructions;
        this.possibleMoves = new Array<PossibleMove>();
        this.table = table;
        this.table.piecesInGame.get(color).push(this);
    }

    move(move: PossibleMove): void {
        this.table.gameHistory.push({ takenBy: this, fromCell: this.cell, toCell: move.toCell, taken: move.pieceToTake });
        this.cell.unregisterPiece();
        this.cell = move.toCell.registerPiece(this);

        if (typeof move.pieceToTake !== "undefined") {
            move.pieceToTake.die();
        }
    }

    die(): void {
        this.table.movePieceFromArray(this.table.piecesInGame, this.table.piecesTaken, this);
        this.cell.unregisterPiece();
    }

    reborn(): void {
        this.table.movePieceFromArray(this.table.piecesTaken, this.table.piecesInGame, this);
        this.cell.registerPiece(this);
    }


    calculateMoves(startCell: Cell = this.cell): PossibleMove[] {
        this.possibleMoves = new Array<PossibleMove>();

        this.moveInstructions.forEach((instructions: Direction[]) => {
            let currentCell = startCell;

            let shouldIfBreak: boolean = false;
            for (let i = 0; i < instructions.length; i++) {
                const instruction = instructions[i];
                switch (instruction) {
                    case Direction.STRAIGHT_UP:
                        this.goThroughAllCells(currentCell, Direction.ONE_UP);
                        //check chess ??
                        break;
                    case Direction.STRAIGHT_RIGHT:
                        this.goThroughAllCells(currentCell, Direction.ONE_RIGHT);
                        //check chess ??
                        break;
                    case Direction.STRAIGHT_DOWN:
                        this.goThroughAllCells(currentCell, Direction.ONE_DOWN);
                        //check chess ??
                        break;
                    case Direction.STRAIGHT_LEFT:
                        this.goThroughAllCells(currentCell, Direction.ONE_LEFT);
                        //check chess ??
                        break;
                    case Direction.STRAIGHT_UP_RIGHT:
                        this.goThroughAllCellsDiagonaly(currentCell, [Direction.ONE_UP, Direction.ONE_RIGHT])
                        //check chess ??
                        break;
                    case Direction.STRAIGHT_DOWN_LEFT:
                        this.goThroughAllCellsDiagonaly(currentCell, [Direction.ONE_DOWN, Direction.ONE_LEFT])
                        //check chess ??
                        break;
                    case Direction.STRAIGHT_LEFT_UP:
                        this.goThroughAllCellsDiagonaly(currentCell, [Direction.ONE_UP, Direction.ONE_LEFT])
                        //check chess ??
                        break;
                    case Direction.STRAIGHT_RIGHT_DOWN:
                        this.goThroughAllCellsDiagonaly(currentCell, [Direction.ONE_DOWN, Direction.ONE_RIGHT])
                        //check chess ??
                        break;
                    case Direction.ONE_UP:
                    case Direction.ONE_RIGHT:
                    case Direction.ONE_DOWN:
                    case Direction.ONE_LEFT:
                        currentCell = currentCell.getNextCell(instruction);

                        if (typeof currentCell == "undefined") {
                            shouldIfBreak = true;
                            break;
                        }

                        if (i === instructions.length - 1) {
                            this.checkCell(currentCell);
                        }

                        break;
                }

                if (shouldIfBreak) {
                    break;
                }
            }
        })

        //TODO

        return this.possibleMoves;
    }

    goThroughAllCellsDiagonaly(startCell: Cell, directions: [Direction, Direction]) {
        while (typeof (startCell = startCell.getNextCell(directions[0])) !== "undefined"
            && typeof (startCell = startCell.getNextCell(directions[1])) !== "undefined") {
            this.checkCell(startCell);
        }
    }

    goThroughAllCells(startCell: Cell, direction: Direction) {
        while ((startCell = startCell.getNextCell(direction)) !== undefined) {
            this.checkCell(startCell);
        }
    }

    checkCell(cellToCheck: Cell): boolean {
        if (typeof cellToCheck.inside === "undefined") {
            this.possibleMoves.push({ toCell: cellToCheck });
            return true;
        } else if (cellToCheck.inside.color !== this.color) {
            this.possibleMoves.push({ toCell: cellToCheck, pieceToTake: cellToCheck.inside });
            //currentCell.inside threath
            return true;
        }

        return false;
    }

}
