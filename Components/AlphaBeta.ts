
import { Table } from "./Table";
import { Color } from "../Enums/Color";
import { Move } from "../Interfaces/Move";

let bestMoves: Map<number, Move>, maximisingPlayer: Color;

export const alphaBetaRoot = (initDepth: number, initAlpha: number, initBeta: number, table: Table): Move => {
    maximisingPlayer = table.whoIsOnTurn;
    bestMoves = new Map<number, Move>();
    alphaBeta(initDepth, initAlpha, initBeta, table);
    return bestMoves.get(initDepth);
}

const alphaBeta = (depth: number, alpha: number, beta: number, table: Table): number => {
    if (depth == 0) {
        return table.eval(maximisingPlayer);
    }

    let PVgefunden: boolean = false;
    let best: number = -Infinity;
    const moves: Move[] = table.generateMoves();

    let move;
    for (move in moves) {
        table.move(<Move>move);
        let wert: number;

        if (PVgefunden) {
            wert = -alphaBeta(depth - 1, -alpha - 1, -alpha, table);

            if (wert > alpha && wert < beta) {
                wert = -alphaBeta(depth - 1, -beta, -wert, table);
            }

        } else {
            wert = -alphaBeta(depth - 1, -beta, -alpha, table);
        }

        table.undoMove();

        if (wert > best) {

            if (wert >= beta) {
                return wert;
            }

            best = wert;
            bestMoves.set(depth, move);

            if (wert > alpha) {
                alpha = wert;
                PVgefunden = true;
            }

        }

    }

    return best;
}
