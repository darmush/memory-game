import { newGame } from './game.js';
import { createRankingBoard } from './ranking.js';
import { CARD_VALUES } from './constants.js';

export function createElement(tag, className, text, appendTo) {
    const element = document.createElement(tag);
    if (className) {
        element.classList.add(className);
    }
    if (text) {
        element.textContent = text;
    }
    appendTo?.appendChild(element);
    return element;
}

export function createButton(className, text, onClick, appendTo) {
    const button = createElement('button', className, text, appendTo);
    button.addEventListener('click', onClick);
    return button;
}

export function createCard(value, appendTo) {
    const card = createElement('div', 'card', null, appendTo);
    card.dataset.value = value;
    return card;
}

export function createInterface() {
    const gameContainer = document.querySelector('.game-container');
    const interfaceContainer = createElement('div', 'interface-container', null, gameContainer);
    createButton('start-button', 'New Game', newGame, interfaceContainer);
    createButton('ranking-button', 'Ranking', createRankingBoard, interfaceContainer);
    createElement('div', 'moves-counter', 'Moves: 0', interfaceContainer);
    createElement('div', 'matched-pairs-counter', `Pairs: 0/${CARD_VALUES.length / 2}`, interfaceContainer);
}

export function createGameContainer() {
    const gameContainer = createElement('div', 'game-container', null, document.body);
    return gameContainer;
}
