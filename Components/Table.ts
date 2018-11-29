
import { Color } from "../Enums/Color";
import { Piece, PossibleMove } from "./Pieces/Piece";
import { Cell } from "./Cell";
import { Pawn } from "./Pieces/Pawn";
import { figures } from "../config";

interface TableParams {
    piecesInGame: Map<Color, Piece[]>;
    piecesTaken: Map<Color, Piece[]>;
    gameHistory: GameHistory[];
    whoIsOnTurn: Color;
    schach: boolean;
    tableRepresentation: Cell[][];
    movePieceFromArray: (from: Map<Color, Piece[]>, to: Map<Color, Piece[]>, piece: Piece) => void;
    undoMove: () => void;
    generateMoves: () => Move[];
    move: (move: Move) => void;
    eval: (maximisingPlayer: Color) => number;
}

export interface Move {
    piece: Piece;
    possibleMove: PossibleMove;
}

export interface GameHistory {
    takenBy: Piece;
    fromCell: Cell;
    toCell: Cell;
    taken?: Piece;
}

export class Table implements TableParams {

    piecesInGame: Map<Color, Piece[]>;
    piecesTaken: Map<Color, Piece[]>;
    gameHistory: GameHistory[];
    whoIsOnTurn: Color;
    tableRepresentation: Cell[][];
    schach: boolean;

    constructor() {

        this.piecesInGame = new Map<Color, Piece[]>();
        this.piecesTaken = new Map<Color, Piece[]>();
        this.gameHistory = new Array<GameHistory>();
        this.schach = false;

        this.tableRepresentation = new Array<Cell[]>(8).fill(new Array<Cell>(8).fill(new Cell()));

        this.tableRepresentation.forEach((layer: Cell[], idx_y: number) => {
            layer.forEach((cell: Cell, idx_x) => {
                if (idx_y == 0) {
                    cell.registerPiece(new Pawn(Color.BLACK, cell, this));
                }
                if (idx_y == 1) {
                    cell.registerPiece(figures[idx_x](Color.BLACK, cell, this));
                }
                if (idx_y == 6) {
                    cell.registerPiece(figures[idx_x](Color.WHITE, cell, this));
                }
                if (idx_y == 7) {
                    cell.registerPiece(new Pawn(Color.WHITE, cell, this));
                }
                if (idx_y > 0) {
                    const topCell: Cell = this.tableRepresentation[idx_y - 1][idx_x];
                    cell.up = topCell;
                    topCell.down = cell;
                }
                if (idx_x > 0) {
                    const leftCell: Cell = this.tableRepresentation[idx_y][idx_x - 1];
                    cell.left = leftCell;
                    leftCell.right = cell;
                }
            });
        });

        this.whoIsOnTurn = Color.WHITE;
    }

    movePieceFromArray(from: Map<Color, Piece[]>, to: Map<Color, Piece[]>, piece: Piece): void {
        const fromArray = from.get(piece.color);
        fromArray.splice(fromArray.indexOf(piece), 1);
        const toArray = to.get(piece.color);
        toArray.push(piece);
    }

    undoMove(): void {
        const lastMove: GameHistory = this.gameHistory.pop();
        Cell.undoMove(lastMove);
    }

    move(move: Move): void {
        move.piece.move(move.possibleMove);
    }

    generateMoves(): Move[] {
        let moves = new Array<Move>();
        this.piecesInGame.get(this.whoIsOnTurn === Color.WHITE ? Color.BLACK : Color.WHITE).forEach((piece: Piece) => piece.calculateMoves())
        this.piecesInGame.get(this.whoIsOnTurn).forEach((piece: Piece) => {
            piece.calculateMoves()
                .forEach((move: PossibleMove) => moves.push({ piece: piece, possibleMove: move }));
        })

        moves.sort((a: Move, b: Move) => {
            return -1
            //TODO
        });

        return moves;
    }

    eval(maximisingPlayer: Color): number {

        const reducer = (accumulator: number, piece: Piece): number => accumulator + piece.type.valueOf();
        const isWhiteOnturn: boolean = maximisingPlayer === Color.WHITE;

        const figuresCounter: number =
            this.piecesInGame
                .get(isWhiteOnturn ? Color.WHITE : Color.BLACK)
                .reduce(reducer, 0)
            -
            this.piecesInGame
                .get(isWhiteOnturn ? Color.BLACK : Color.WHITE)
                .reduce(reducer, 0);

        return 2;
        //TODO
    }

}
