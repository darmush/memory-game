# Memory Game

A card-matching game: flip the cards, remember where they are, and find all 8 pairs in as few moves as possible.

**Demo:** https://darmush.github.io/memory-game/

<img width="277" height="441" alt="Recording 2026-10-06 021022" src="https://github.com/user-attachments/assets/eb2a2782-b8c1-47cd-94d8-d30135dce80b" />


## Tech stack

- HTML, CSS, JavaScript (ES modules)
- No libraries, frameworks or build tools
- All markup is generated with `document.createElement`; the `<body>` in `index.html` is empty

## Run locally

The app uses ES modules, so it has to be served over HTTP — opening `index.html` directly from the file system will not work.

1. Clone the repository and switch to the `memory-game` branch:

   ```bash
   git clone https://github.com/darmush/memory-game.git
   cd memory-game
   git checkout memory-game
   ```

2. Start any static server in the project folder. For example:

   ```bash
   npx serve
   ```

   Alternatively, open the folder in VS Code and run `index.html` with the **Live Server** extension.

3. Open the address printed by the server in a browser (for example, http://localhost:8000).

## Project structure

```
index.html        entry point with an empty <body>
style.css         styles
js/
  main.js         app initialisation
  layout.js       header, counters, garland
  game.js         game logic: board, card selection, new game
  modals.js       win modal and ranking content
  dom.js          helpers for creating elements and the shared modal
  state.js        game state
  storage.js      localStorage helpers
  constants.js    board size, card values, delay
```
