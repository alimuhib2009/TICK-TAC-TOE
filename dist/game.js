export class Game {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.status = 'playing';
        this.winningLine = null;
    }
    makeMove(index) {
        if (this.board[index] || this.status !== 'playing')
            return false;
        this.board[index] = this.currentPlayer;
        this.checkStatus();
        if (this.status === 'playing') {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
        return true;
    }
    checkStatus() {
        const winLines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        for (const line of winLines) {
            const [a, b, c] = line;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.status = 'won';
                this.winningLine = line;
                return;
            }
        }
        if (!this.board.includes(null)) {
            this.status = 'draw';
        }
    }
    reset() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.status = 'playing';
        this.winningLine = null;
    }
}
