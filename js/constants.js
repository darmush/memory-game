export const BOARD_ROWS = 4;
export const BOARD_COLS = 4;

export const PAIR_VALUES = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'pink'];
export const PAIR_COUNT = (BOARD_ROWS * BOARD_COLS) / 2;

const usedValues = PAIR_VALUES.slice(0, PAIR_COUNT);
export const CARD_VALUES = [...usedValues, ...usedValues];

export const DELAY_TO_CLOSE_CARDS = 700;
