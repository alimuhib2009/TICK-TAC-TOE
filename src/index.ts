import { Game } from './game.js';
import { UI } from './ui.js';
import { AI } from './ai.js';

class App {
    private game: Game;
    private ui: UI;
    private gameModeSelect: HTMLSelectElement;
    private resetBtn: HTMLButtonElement;
    private cells: NodeListOf<HTMLElement>;

    constructor() {
        this.game = new Game();
        this.ui = new UI();
        this.gameModeSelect = document.getElementById('game-mode') as HTMLSelectElement;
        this.resetBtn = document.getElementById('reset-btn') as HTMLButtonElement;
        this.cells = document.querySelectorAll('.cell');

        this.init();
    }

    private init() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });

        this.resetBtn.addEventListener('click', () => this.resetGame());
        
        // Reset game when mode changes
        this.gameModeSelect.addEventListener('change', () => this.resetGame());
    }

    private handleCellClick(cell: HTMLElement) {
        const index = parseInt(cell.getAttribute('data-index')!);
        
        if (this.game.makeMove(index)) {
            this.ui.updateBoard(this.game);

            if (this.game.status === 'playing' && this.gameModeSelect.value === 'pve') {
                // AI's turn
                setTimeout(() => {
                    const aiMove = AI.getBestMove(this.game);
                    this.game.makeMove(aiMove);
                    this.ui.updateBoard(this.game);
                }, 500); // Small delay for better UX
            }
        }
    }

    private resetGame() {
        this.game.reset();
        this.ui.updateBoard(this.game);
    }
}

// Initialize the app
window.addEventListener('DOMContentLoaded', () => {
    new App();
});
