import { createElement, createCard } from './dom.js';
import { gameState } from './state.js';
import { updateMovesCounter, updatePairsCounter } from './layout.js';
import { CARD_VALUES, BOARD_ROWS, BOARD_COLS } from './constants.js';


function randomize(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

export function createGameBoard(rows, cols) {
    const gameContainer = document.querySelector('.game-container');
    const gameBoard = createElement('div', 'game-board', null, gameContainer);

    const shuffledCards = randomize([...CARD_VALUES]);
    gameBoard.style.setProperty('--cols', cols);

    for (let i = 0; i < rows * cols; i++) {
        createCard(shuffledCards[i], gameBoard);
    }
    return gameBoard;
}

export function startGame() {
    return createGameBoard(BOARD_ROWS, BOARD_COLS);
}

export function newGame() {
    gameState.gameBoard?.remove();
    resetGameState();
    updateMovesCounter();
    updatePairsCounter();
    gameState.gameBoard = startGame();
}

export function resetGameState() {
    gameState.gameBoard = null;
    gameState.firstCard = null;
    gameState.secondCard = null;
    gameState.matchedPairs = 0;
    gameState.moves = 0;
    gameState.isLocked = false;
}
