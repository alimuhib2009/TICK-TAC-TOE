export class UI {
    constructor() {
        this.cells = document.querySelectorAll('.cell');
        this.statusDisplay = document.getElementById('status');
        this.boardElement = document.getElementById('board');
    }
    updateBoard(game) {
        this.cells.forEach((cell, index) => {
            var _a;
            const player = game.board[index];
            cell.className = 'cell'; // Reset classes
            if (player) {
                cell.classList.add(player.toLowerCase());
            }
            if ((_a = game.winningLine) === null || _a === void 0 ? void 0 : _a.includes(index)) {
                cell.classList.add('winning');
            }
        });
        this.updateStatus(game);
    }
    updateStatus(game) {
        if (game.status === 'won') {
            this.statusDisplay.textContent = `Player ${game.currentPlayer} Wins!`;
            this.statusDisplay.style.color = game.currentPlayer === 'X' ? 'var(--neon-blue)' : 'var(--neon-pink)';
        }
        else if (game.status === 'draw') {
            this.statusDisplay.textContent = "It's a Draw!";
            this.statusDisplay.style.color = 'var(--text-color)';
        }
        else {
            this.statusDisplay.textContent = `Player ${game.currentPlayer}'s Turn`;
            this.statusDisplay.style.color = 'var(--text-color)';
        }
    }
    clearBoard() {
        this.cells.forEach(cell => {
            cell.className = 'cell';
            cell.textContent = '';
        });
        this.statusDisplay.textContent = "Player X's Turn";
        this.statusDisplay.style.color = 'var(--text-color)';
    }
}
