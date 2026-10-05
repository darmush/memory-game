import { createRankingBoard } from './modals.js';
import { PAIR_COUNT } from './constants.js';
import { createElement, createButton } from './dom.js';
import { gameState } from './state.js';


export function createInterface(gameContainer, onNewGame) {
    const interfaceContainer = createElement('header', 'interface-container', null, gameContainer);
    createButton('start-button', 'New Game', onNewGame, interfaceContainer);
    setCounters(PAIR_COUNT, interfaceContainer);
    createButton('ranking-button', 'Ranking', createRankingBoard, interfaceContainer);

    const garland = createElement('div', 'garland', null, gameContainer);
    for (let i = 0; i < PAIR_COUNT; i++) {
        createElement('div', 'bulb', null, garland);
    }
}

export function createGameContainer() {
    const gameContainer = createElement('div', 'game-container', null, document.body);
    return gameContainer;
}

export function setCounters(pairCount, container) {
    const countersContainer = createElement('div', 'counters-container', null, container);
    gameState.movesCounter = createElement('div', 'moves-counter', `Moves: ${gameState.moves}`, countersContainer);
    gameState.pairsCounter = createElement('div', 'matched-pairs-counter', `Pairs: ${gameState.matchedPairs}/${pairCount}`, countersContainer);
}

export function updateMovesCounter() {
    if (gameState.movesCounter) {
        gameState.movesCounter.textContent = `Moves: ${gameState.moves}`;
    }
}

export function updatePairsCounter() {
    if (gameState.pairsCounter) {
        gameState.pairsCounter.textContent = `Pairs: ${gameState.matchedPairs}/${PAIR_COUNT}`;
    }
}


