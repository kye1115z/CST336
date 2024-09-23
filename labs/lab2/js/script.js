//Global variables
let randomNumber;
let attempts = 0;
let remainingAttempts = 7;
let record = { win: 0, lose: 0 };

initializeGame();
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

// enter key
document
  .querySelector("#playerGuess")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      checkGuess();
    }
  });

function initializeGame() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  attempts = 0;
  remainingAttempts = 7; // Reset Remaining Attempts

  //hiding the Reset button
  document.querySelector("#resetBtn").style.display = "none";

  // Showing the Guess button
  document.querySelector("#guessBtn").style.display = "inline";

  let playerGuess = document.querySelector("#playerGuess");
  playerGuess.focus();
  playerGuess.value = "";

  let feedback = document.querySelector("#feedback");
  feedback.textContent = "";

  // clearing previous guesses
  document.querySelector("#guesses").textContent = "";

  updateRemainingAttempts();
  updateRecordDisplay();
}

function checkGuess() {
  let feedback = document.querySelector("#feedback");
  feedback.textContent = "";
  let guess = document.querySelector("#playerGuess").value;
  if (guess < 1 || guess > 99) {
    feedback.textContent = "Enter a number between 1 and 99";
    feedback.style.color = "red";
    return;
  }

  attempts++;
  remainingAttempts--;
  updateRemainingAttempts();
  feedback.style.color = "orange";
  if (guess == randomNumber) {
    feedback.textContent = "You guessed it! You won!";
    feedback.style.color = "darkgreen";
    record.win++; // record win
    gameOver();
  } else {
    document.querySelector("#guesses").textContent += guess + " ";
    if (attempts == 7) {
      feedback.innerHTML = `Sorry, you lost!<br>The correct number was ${randomNumber}`;
      feedback.style.color = "red";
      record.lose++; // record lose
      gameOver();
    } else if (guess > randomNumber) {
      feedback.textContent = "Guess was high";
    } else {
      feedback.textContent = "Guess was low";
    }
  }
}

function gameOver() {
  let guessBtn = document.querySelector("#guessBtn");
  let resetBtn = document.querySelector("#resetBtn");
  guessBtn.style.display = "none";
  resetBtn.style.display = "inline";
  updateRecordDisplay();
}

function updateRecordDisplay() {
  document.querySelector(
    "#record"
  ).textContent = `Wins: ${record.win} | Losses: ${record.lose}`;
}

function updateRemainingAttempts() {
  document.querySelector(
    "#remainingAttempts"
  ).textContent = `Remaining Attempts: ${remainingAttempts}`;
}
