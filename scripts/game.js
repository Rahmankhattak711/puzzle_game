import { CreateBoard } from "./script.js";

let isMoving = false;

export function MoveTile(clickedIndex, allTiles, boardSize, tiles, audio) {
  if (isMoving) return;

  let emptyIndex = tiles.indexOf(null);
  const clickedPos = {
    row: Math.floor(clickedIndex / boardSize),
    col: clickedIndex % boardSize,
  };

  const emptyPos = {
    row: Math.floor(emptyIndex / boardSize),
    col: emptyIndex % boardSize,
  };

  let isMatch =
    (Math.abs(clickedPos.row - emptyPos.row) === 1 &&
      clickedPos.col === emptyPos.col) ||
    (Math.abs(clickedPos.col - emptyPos.col) === 1 &&
      clickedPos.row === emptyPos.row);

  if (!isMatch) return;

  isMoving = true;

  const clickedTile = allTiles[clickedIndex];
  const emptyTile = allTiles[emptyIndex];

  audio.play();

  const directionX = (emptyPos.col - clickedPos.col) * 100;
  const directionY = (emptyPos.row - clickedPos.row) * 100;

  clickedTile.style.transform = `translate(${directionX}px, ${directionY}px)`;

  clickedTile.addEventListener("transitionend", () => {
    [tiles[emptyIndex], tiles[clickedIndex]] = [
      tiles[clickedIndex],
      tiles[emptyIndex],
    ];
    CreateBoard();
    isMoving = false;
    CheckWin(tiles);
  });
}

export function CheckWin(tiles) {
  for (let i = 0; i < tiles.length - 1; i++) {
    if (tiles[i] !== i + 1) return;
  }
  let WinnerDisplay = document.createElement("h1");
  WinnerDisplay.textContent = "Congratulations! You Win!";
  document.body.appendChild(WinnerDisplay);
}
