import { createElement, createModal, createButton } from './dom.js';
import { getFromLocalStorage, saveToLocalStorage } from './storage.js';
import { gameState } from './state.js';

export function createRankingBoard() {
    const rankingBoard = createElement('div', 'ranking-board', null, document.body);
    createElement('h2', 'ranking-title', 'Ranking Board', rankingBoard);

    const rankingTable = createElement('table', 'ranking-table', null, rankingBoard);
    if (getFromLocalStorage('ranking')?.length === 0 || !getFromLocalStorage('ranking')) {
        createElement('p', 'no-ranking-message', 'No results yet', rankingBoard);
    } else {
        const rankingData = getFromLocalStorage('ranking');
        const tableHeader = createElement('tr', 'table-header', null, rankingTable);
        createElement('th', 'rank-header', 'Rank', tableHeader);
        createElement('th', 'moves-header', 'Moves', tableHeader);
        createElement('th', 'date-header', 'Date', tableHeader);

        rankingData.slice(0, 5).forEach((entry, index) => {
            const tableRow = createElement('tr', `ranking-row`, null, rankingTable);
            createElement('td', 'rank-cell', index + 1, tableRow);
            createElement('td', 'moves-cell', entry.moves, tableRow);
            createElement('td', 'date-cell', entry.date, tableRow);
        });
    }

    createModal(rankingBoard);
    return rankingBoard;
}

export function openModalWin(onNewGame) {
    const winContent = createElement('div', 'modal-win', null, document.body);
    createElement('h2', 'win-title', 'Congratulations', winContent);
    createElement('p', 'win-message', `You have matched all pairs in ${gameState.moves} moves`, winContent);
    if (gameState.moves < getFromLocalStorage('bestMoves') || !getFromLocalStorage('bestMoves')) {
        saveToLocalStorage('bestMoves', gameState.moves);
        createElement('p', 'win-message', 'This is a new record!', winContent);
    }
    createButton('start-button', 'New Game', (event) => {
        event.target.closest('dialog').close();
        onNewGame();
    }, winContent);

    createModal(winContent);
    return winContent;
}
