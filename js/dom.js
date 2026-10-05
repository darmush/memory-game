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

export function createModal(content) {
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

    modal.addEventListener('close', () => modal.remove());
    modal.showModal();
    return modal;
}

