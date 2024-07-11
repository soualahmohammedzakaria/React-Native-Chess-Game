import { Chess } from "chess.js";

export function getGameResult(chess: Chess, player: string) {
    if (chess.isCheckmate()) {
        return(`${player === 'w' ? 'White' : 'Black'} won by Checkmate`);
    } else if (chess.isStalemate()) {
        return('Draw by Stalemate');
    } else if (chess.isThreefoldRepetition()) {
        return('Draw by Threefold Repetition');
    } else if (chess.isInsufficientMaterial()) {
        return('Draw by Insufficient Material');
    } else if (chess.isDraw()) {
        return('Draw');
    } else {
        return('Game in progress');
    }
}