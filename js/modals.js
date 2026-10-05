import { createElement, createModal, createButton } from './dom.js';
import { getFromLocalStorage, saveToLocalStorage } from './storage.js';
import { gameState } from './state.js';

export function createRankingBoard() {
    const rankingData = getFromLocalStorage('ranking') || [];
    const rankingBoard = createElement('div', 'ranking-board', null, null);
    createElement('h2', 'ranking-title', 'Ranking Board', rankingBoard);


    if (rankingData.length === 0) {
        createElement('p', 'no-ranking-message', 'No results yet', rankingBoard);
    } else {
        const rankingTable = createElement('table', 'ranking-table', null, rankingBoard);
        const tableHeader = createElement('tr', 'table-header', null, rankingTable);
        createElement('th', 'rank-header', 'Rank', tableHeader);
        createElement('th', 'moves-header', 'Moves', tableHeader);
        createElement('th', 'date-header', 'Date', tableHeader);

        rankingData.slice(0, 10).forEach((entry, index) => {
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
    const winContent = createElement('div', 'modal-win', null, null);
    const bestMoves = getFromLocalStorage('bestMoves');
    saveResult(gameState.moves);

    createElement('h2', 'win-title', 'Congratulations', winContent);
    createElement('p', 'win-message', `You have matched all pairs in\u00A0${gameState.moves}\u00A0moves`, winContent);

    if (gameState.moves < bestMoves || !bestMoves) {
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

function saveResult(moves) {
    const ranking = getFromLocalStorage('ranking') || [];
    ranking.push({ moves: moves, date: formatDate(new Date()) });
    ranking.sort((a, b) => a.moves - b.moves);
    saveToLocalStorage('ranking', ranking.slice(0, 10));
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}.${date.getFullYear()}`;
}
