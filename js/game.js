// import gameState from './state.js';
import init from './main.js';
import { createElement, createCard, createGameContainer } from './layout.js';
import { gameState } from './state.js';

import { randomize } from './tools.js';
import { CARD_VALUES, BOARD_ROWS, BOARD_COLS } from './constants.js';


export function createGameBoard(rows, cols) {
    const gameContainer = document.querySelector('.game-container');
    const gameBoard = createElement('div', 'game-board', null, gameContainer);

    const shuffledCards = randomize([...CARD_VALUES]);

    for (let i = 0; i < rows * cols; i++) {
        createCard(shuffledCards[i], gameBoard);
    }
    return gameBoard;
}


export function startGame() {
    return createGameBoard(BOARD_ROWS, BOARD_COLS);

}


export function newGame() {
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        gameContainer.remove();
    }
    resetGameState();
    init();

}

export function resetGameState() {
    gameState.gameBoard = null;
    gameState.firstCard = null;
    gameState.secondCard = null;
    gameState.matchedPairs = 0;
    gameState.moves = 0;
    gameState.isLocked = false;
}
