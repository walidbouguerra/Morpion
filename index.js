//Variables
let gridCells = document.querySelectorAll(".cell");
let scoreMessage = document.getElementById("scoreMessage");
let resetButton = document.getElementById("resetButton");
let player = "X";
let moves = 0;
let winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Click events
function click(e) {
  let cell = e.target;
  if (cell.textContent == "") {
    moves++;
    if (player == "X") {
      cell.style.color = "black";
    } else {
      cell.style.color = "red";
    }
    cell.textContent = player;
    player = switchPlayer(player);
    if (!win(gridCells, winCondition) && moves > 8) {
      scoreDisplay();
    }
  }
}
gridCells.forEach((cell) => {
  cell.addEventListener("click", click);
});

//Reset game
resetButton.addEventListener("click", () => {
  moves = 0;
  gridCells.forEach((cell) => {
    cell.textContent = "";
  });
  scoreMessage.style.display = "none";
  resetButton.style.display = "none";
  player = "X";
  gridCells.forEach((cell) => {
    cell.addEventListener("click", click);
  });
});

//Win conditions
function win(gridCells, winCondition) {
  for (let i = 0; i < winCondition.length; i++) {
    if (
      gridCells[winCondition[i][0]].textContent == "X" &&
      gridCells[winCondition[i][1]].textContent == "X" &&
      gridCells[winCondition[i][2]].textContent == "X"
    ) {
      scoreDisplay("X");
      return true;
    } else if (
      gridCells[winCondition[i][0]].textContent == "O" &&
      gridCells[winCondition[i][1]].textContent == "O" &&
      gridCells[winCondition[i][2]].textContent == "O"
    ) {
      scoreDisplay("O");
      return true;
    }
  }
}

//Switching player
function switchPlayer(lastPlayer) {
  let player;
  if (lastPlayer == "X") {
    player = "O";
  } else {
    player = "X";
  }
  return player;
}

//Score display
function scoreDisplay(player) {
  gridCells.forEach((cell) => {
    cell.removeEventListener("click", click);
  });
  scoreMessage.textContent = "Joueur " + player + " gagne !";
  resetButton.style.display = "block";
  scoreMessage.style.display = "block";
  if (player === undefined) {
    scoreMessage.textContent = "Égalité !";
  }
}
