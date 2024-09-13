let correctNumber = Math.floor(1 + Math.random() * 99);
let previousGuess = "";
let attempts = 0;
console.log(correctNumber);

let guessButton = document.querySelector("#guess_button");
let guessInput = document.querySelector("#guess_input");

// guessButton Event
guessButton.addEventListener("click", function () {
  if (guessInput.value == "") {
    return;
  } else {
    if (recordAttempt()) {
      showMessage();
      recordPrevious();
      attempts += 1;
      guessInput.value = "";
    } else {
      message.innerText = `You Lose!`;
      message.style.color = "#F03F35";
      messageWrap.style.backgroundColor = "#fed7d7";
      document.innerHTML = `<button id="again_button" onclick="reload()">try again!</button>`;
    }
  }
});

// showMessage
function showMessage() {
  let message = document.querySelector("#message");
  let messageWrap = document.querySelector(".message_wrap");
  messageWrap.style.height = "auto";
  document.querySelector("#previous_guess_message").style.height = "auto";
  if (guessInput.value < correctNumber) {
    message.innerText = `Guess was low. Try again!`;
    message.style.color = "#F03F35";
    messageWrap.style.backgroundColor = "#fed7d7";
  } else if (guessInput.value > correctNumber) {
    message.innerText = `Guess was high. Try again!`;
    messageWrap.style.backgroundColor = "#fed7d7";
    message.style.color = "#F03F35";
  } else {
    if (recordAttempt()) {
      message.innerText = `Congratulations! You got it right within 7 attempts!`;
    } else {
      message.innerText = `Congratulations! You got it right after ${attempts} attempts!`;
    }
    message.style.color = "green";
    messageWrap.style.backgroundColor = "#D3E8E1";
  }
}

// track_previous
function recordPrevious() {
  let previousGuessMsg = document.querySelector("#previous_guess_message");
  previousGuess += `${guessInput.value}\u00a0`;
  previousGuessMsg.innerText = `Previous Guesses: ${previousGuess}`;
}

// recordAttempt
function recordAttempt() {
  if (attempts <= 7) {
    return true;
  } else {
    return false;
  }
}

function reload() {
  location.reload(true);
}
