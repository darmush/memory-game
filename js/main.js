import { createInterface, createGameContainer } from './layout.js';
import { gameState } from './state.js';
import { startGame, newGame } from './game.js';

function init() {
    gameState.gameContainer = createGameContainer();
    createInterface(gameState.gameContainer, newGame);
    startGame();
}

init();
