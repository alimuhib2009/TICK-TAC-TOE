import { Player, Game } from './game.js';

export class AI {
    static getBestMove(game: Game): number {
        const board = [...game.board];
        const bestMove = this.minimax(board, 'O', true).index;
        return bestMove!;
    }

    private static minimax(board: (Player | null)[], player: Player, isMaximizing: boolean) {
        const availableMoves = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];

        // Terminal states
        const winner = this.checkWinner(board);
        if (winner === 'O') return { score: 10 };
        if (winner === 'X') return { score: -10 };
        if (availableMoves.length === 0) return { score: 0 };

        const moves = [];

        for (const index of availableMoves) {
            const move: { index?: number, score?: number } = { index };
            board[index] = player;

            if (isMaximizing) {
                const result = this.minimax(board, 'X', false);
                move.score = result.score;
            } else {
                const result = this.minimax(board, 'O', true);
                move.score = result.score;
            }

            board[index] = null;
            moves.push(move);
        }

        let bestMoveIndex = 0;
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score! > bestScore) {
                    bestScore = moves[i].score!;
                    bestMoveIndex = i;
                }
            }
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score! < bestScore) {
                    bestScore = moves[i].score!;
                    bestMoveIndex = i;
                }
            }
        }

        return moves[bestMoveIndex];
    }

    private static checkWinner(board: (Player | null)[]): Player | 'draw' | null {
        const winLines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const [a, b, c] of winLines) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        if (!board.includes(null)) return 'draw';
        return null;
    }
}
