import { MoveTile } from "./game.js";

const board = document.getElementById("board");
const allTiles = board.getElementsByTagName("div");
const selectSized = document.getElementById("selectSized");
const displaySelectedImage = document.getElementById("displaySelectedImage");
let firstContainer = document.querySelector(".firstContainer");
let lastContainer = document.querySelector(".lastContainer");
let form = document.querySelector(".form");
let images = document.querySelectorAll("#images img");
let audio = document.getElementById("audio");
let backbtn = document.querySelector(".backbtn");

let boardSize = parseInt(selectSized.value);
let selectedImageSrc = images[0].src;

images[0].classList.add("selected");

images.forEach((image) => {
  image.addEventListener("click", () => {
    selectedImageSrc = image.src;

    images.forEach((img) => img.classList.remove("selected"));
    image.classList.add("selected");
  });
});

const tiles = [];

selectSized.addEventListener("change", () => {
  boardSize = parseInt(selectSized.value);
  setupTiles();
  CreateBoard();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  firstContainer.style.display = "none";
  lastContainer.style.display = "block";
  backbtn.style.display = "block";
  CreateBoard();
});


function setupTiles() {
  tiles.length = 0;
  for (let i = 0; i < boardSize * boardSize - 1; i++) {
    tiles.push(i + 1);
  }
  tiles.push(null);

  tiles.sort(() => Math.random() - 0.5);
}

export function CreateBoard() {
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${boardSize}, 100px)`;
  board.style.gridTemplateRows = `repeat(${boardSize}, 100px)`;

  tiles.forEach((value, index) => {
    const tile = document.createElement("div");
    if (value === null) {
      tile.classList.add("empty");
    } else {
      tile.classList.add("tile");
      tile.style.backgroundImage = `url(${selectedImageSrc})`;
      tile.style.backgroundSize = `${boardSize * 100}px ${boardSize * 100}px`;
      displaySelectedImage.style.backgroundImage = `url(${selectedImageSrc})`;

      const col = (value - 1) % boardSize;
      const row = Math.floor((value - 1) / boardSize);

      tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;

      tile.addEventListener(
        "click",
        () => MoveTile(index, allTiles, boardSize, tiles,audio),
      );

    }
    board.appendChild(tile);
  });
}

setupTiles();
CreateBoard();
