import { createInterface } from './layout.js';
import { startGame } from './game.js';
import { createGameContainer } from './layout.js';
import { gameState } from './state.js';

export default function init() {
    gameState.gameContainer = createGameContainer();
    createInterface(gameState.gameContainer);
    gameState.gameBoard = startGame();
}

init();
