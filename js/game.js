import { createElement, createCard } from './dom.js';
import { gameState } from './state.js';
import { updateMovesCounter, updatePairsCounter } from './layout.js';
import { CARD_VALUES, BOARD_ROWS, BOARD_COLS, PAIR_COUNT, DELAY_TO_CLOSE_CARDS } from './constants.js';
import { openModalWin } from './modals.js';

export function createGameBoard(rows, cols) {
    const gameContainer = gameState.gameContainer;
    const gameBoard = createElement('div', 'game-board', null, gameContainer);
    const shuffledCards = randomize([...CARD_VALUES]);
    gameBoard.style.setProperty('--cols', cols);

    for (let i = 0; i < rows * cols; i++) {
        createCard(shuffledCards[i], gameBoard);
    }
    return gameBoard;
}

export function startGame() {
    const gameBoard = createGameBoard(BOARD_ROWS, BOARD_COLS);

    gameState.gameBoard = gameBoard;
    gameBoard.addEventListener('click', onCardClick);

    return gameBoard;
}

function onCardClick(event) {
    const card = event.target.closest('.card');

    if (!card || gameState.isLocked || card === gameState.firstCard || card === gameState.secondCard || card.classList.contains('matched')) {
        return;
    }

    card.classList.add('open');

    if (!gameState.firstCard) {
        gameState.firstCard = card;
        return;
    }

    gameState.secondCard = card;
    gameState.moves++;
    updateMovesCounter();
    checkForMatch();
}

function checkForMatch() {
    const { firstCard, secondCard } = gameState;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        gameState.matchedPairs++;
        lightUpGarland(firstCard.dataset.value);
        updatePairsCounter();
        resetStateCards();

        if (gameState.matchedPairs === PAIR_COUNT) {
            finishGame();
        }
        return;
    }

    gameState.isLocked = true;
    gameState.timer = setTimeout(() => {
        firstCard.classList.remove('open');
        secondCard.classList.remove('open');
        resetStateCards();
        gameState.isLocked = false;
    }, DELAY_TO_CLOSE_CARDS);
}


function resetStateCards() {
    gameState.firstCard = null;
    gameState.secondCard = null;
}

function lightUpGarland(value) {
    const bulbs = gameState.gameContainer.querySelectorAll('.bulb');
    const bulb = bulbs[gameState.matchedPairs - 1];
    bulb.dataset.value = value;
    bulb.classList.add('lit');
}

function resetGarland() {
    gameState.gameContainer.querySelectorAll('.bulb').forEach(bulb => {
        bulb.classList.remove('lit');
        delete bulb.dataset.value;
    });
}

function finishGame() {
    openModalWin(newGame);
}

export function newGame() {
    gameState.gameBoard?.remove();
    resetGameState();
    resetGarland();
    updateMovesCounter();
    updatePairsCounter();
    startGame();
}

export function resetGameState() {
    gameState.gameBoard = null;
    gameState.firstCard = null;
    gameState.secondCard = null;
    gameState.matchedPairs = 0;
    gameState.moves = 0;
    gameState.isLocked = false;
    clearTimeout(gameState.timer);
    gameState.timer = null;
}

function randomize(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

