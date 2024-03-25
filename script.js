console.log("Welcome to the game!");

// Audio files initialization
let music1 = new Audio("music1.mp3");
let audioturn = new Audio("ting.mp3");
let gameoverm = new Audio("gameover.mp3");
let victorySound = new Audio("victory.mp3"); // Add your victory sound file here
let drawSound = new Audio("draw.mp3"); // Add your draw sound file here

// Game variables
let turn = "X";
let isgameover = false;

// Function to change the turn
const changeTurn = () => (turn === "X" ? "O" : "X");

// Function to check for a winner
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 24, 42, 0],
    [3, 4, 5, 24, 132, 0],
    [6, 7, 8, 24, 266, 0],
    [0, 3, 6, -69, 131, 90],
    [1, 4, 7, 24, 131, 90],
    [2, 5, 8, 118, 131, 90],
    [0, 4, 8, 18, 131, 45],
    [2, 4, 6, 26, 131, 135],
  ];
  
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
      ) {
      document.querySelector(".info").innerText = `PLAYER ${boxtext[e[0]].innerText} WON`;
      isgameover = true;
      victorySound.play();
      document.querySelector(".line").style.transform = `translate(${e[3]}px, ${e[4]}px) rotate(${e[5]}deg)`;
      document.querySelector(".line").style.width = "218px";
    }
  });

  // Check for a draw if the board is full and no winner is found
  if (!isgameover) {
    let filledBoxes = Array.from(boxtext).filter((text) => text.innerText.trim() !== "");
    if (filledBoxes.length === 9) {
      document.querySelector(".info").innerText = "It's a draw!";
      drawSound.play();
      isgameover = true;
    }
  }
};

// Game logic
Array.from(document.getElementsByClassName("box")).forEach((element) => {
  element.addEventListener("click", () => {
    let boxtext = element.querySelector(".boxtext");
    if (boxtext.innerText === "" && !isgameover) {
      boxtext.innerText = turn;
      audioturn.play();
      checkWin();
      if (!isgameover) {
        turn = changeTurn();
        document.querySelector(".info").innerText = `Turn for ${turn}`;
      }
    }
  });
});

// Reset game logic
document.getElementById("reset").addEventListener("click", () => {
  Array.from(document.querySelectorAll(".boxtext")).forEach((boxtext) => {
    boxtext.innerText = "";
  });

  isgameover = false;
  turn = "X";
  document.querySelector(".info").innerText = `Turn for ${turn}`;
  document.querySelector(".line").style.width = "0px";
  
  if (!isgameover) {
    gameoverm.play();
  }
});
music1.play();

// Start the background music when the game loads