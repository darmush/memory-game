import { createElement } from './layout.js';

export function createRankingBoard() {
    const rankingBoard = createElement('div', 'ranking-board', null, document.body);
    createElement('h2', 'ranking-title', 'Ranking Board', rankingBoard);
    createElement('table', 'ranking-table', null, rankingBoard);

    createModal(rankingBoard);
    return rankingBoard;
}

function createModal(content) {
    const modal = createElement('dialog', 'modal', null, document.body);

    const closeButton = createElement('button', 'modal-close', '×', modal);
    closeButton.addEventListener('click', () => {
        modal.close();
    });

    modal.append(content);
    let pressedOnBackdrop = false;

    modal.addEventListener('pointerdown', (event) => {
        pressedOnBackdrop = event.target === modal;
    });


    modal.addEventListener('click', (event) => {
        const isBackdrop = pressedOnBackdrop && event.target === modal;
        if (isBackdrop || event.target.closest('.modal-close')) modal.close();
    });

    modal.showModal();
    return modal;
}

