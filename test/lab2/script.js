document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);
let randomNumber;
let attempts = 0;
let remainAttempts = 7;
let result = { win: 0, lose: 0 };

initializeGame();

function initializeGame() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  attempts = 0;
  remainAttempts = 7;
  document.querySelector("#remainAttempts").textContent = remainAttempts;
  document.querySelector("#resetBtn").style.display = "none";
  document.querySelector("#guessBtn").style.display = "inline";

  let playerGuess = document.querySelector("#playerGuess");
  playerGuess.focus();
  playerGuess.value = "";

  let feedback = document.querySelector("#feedback");
  feedback.textContent = "";

  document.querySelector("#guesses").textContent = "";
}

function checkGuess() {
  let feedback = document.querySelector("#feedback");
  feedback.textContent = ""; // 초기화 해주기!!!!

  let guess = document.querySelector("#playerGuess").value;
  if (guess < 1 || guess > 99) {
    feedback.textContent = "Enter a nember between 1 and 99";
    feedback.style.color = "red";
    return;
  }

  attempts++;
  remainAttempts--;
  feedback.style.color = "orange";
  if (guess == randomNumber) {
    feedback.textContent = "Congraturations! You won!";
    feedback.style.color = "darkgreen";
    result.win += 1;
    gameOver();
  } else {
    document.querySelector("#guesses").textContent += guess + " ";
    if (attempts == 7) {
      feedback.textContent = `sorry, you lost! The number was ${randomNumber}`;
      feedback.style.color = "red";
      result.lose += 1;
      gameOver();
    } else if (guess > randomNumber) {
      feedback.textContent = "Guess was high";
    } else {
      feedback.textContent = "Guess was low";
    }
  }
  document.querySelector("#remainAttempts").textContent = remainAttempts;
  document.querySelector(
    "#result"
  ).textContent = `win: ${result.win} | lose: ${result.lose}`;
}

function gameOver() {
  let guessBtn = document.querySelector("#guessBtn");
  let resetBtn = document.querySelector("#resetBtn");
  guessBtn.style.display = "none";
  resetBtn.style.display = "inline";
}
