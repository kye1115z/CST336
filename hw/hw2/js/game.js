// get params
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

let attempts = 0;
let level = 1;
let selectedWord;
let guessedLetters = [];

initialSetting();

const guessButton = document.getElementById("guess_btn");
guessButton.addEventListener("click", handleGuess);

function initialSetting() {
  let titleEl = document.querySelector(".title");
  let subtitleEl = document.querySelector(".subtitle");
  titleEl.innerHTML = `Level ${level}`;
  subtitleEl.innerText = category;
  fetchData();
  updateHangman();
  createAlphabetLetters();
}

async function fetchData() {
  const data = await fetch("../data/categories.json");
  const res = await data.json();
  const words = res[category];
  startGame(words);
}

function startGame(words) {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  console.log(selectedWord);
  updateWordDisplay();
}

function updateWordDisplay() {
  const wordDisplay = document.getElementById("word_display");
  let displayedWord = selectedWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  if (selectedWord.length > 7) {
    const firstPart = displayedWord.split(" ").slice(0, 5).join(" ");
    const secondPart = displayedWord.split(" ").slice(5).join(" ");

    wordDisplay.innerHTML = `${firstPart}<br>${secondPart}`;
  } else {
    wordDisplay.innerHTML = displayedWord;
  }
}

function handleGuess() {
  const letterInputElement = document.getElementById("letter_input");
  if (!letterInputElement) return;
  const letterInput = letterInputElement.value.trim().toUpperCase();

  if (!/^[A-Z]$/.test(letterInput)) {
    letterInputElement.value = "";
    return;
  }

  if (letterInput && !guessedLetters.includes(letterInput)) {
    guessedLetters.push(letterInput);
    console.log(guessedLetters);
    updateWordDisplay();

    if (!selectedWord.includes(letterInput)) {
      attempts++;
      updateHangman();
    }

    if (
      selectedWord.split("").every((letter) => guessedLetters.includes(letter))
    ) {
      endGame("win");
    } else if (attempts >= 7) {
      endGame("lose");
    }
  }
  showOverlay(letterInput);
  letterInputElement.value = "";
}

function updateHangman() {
  const hangmanImg = document.querySelector("#hangman_img");
  if (hangmanImg) {
    hangmanImg.src = `../img/hangman_${attempts}.png`;
  }
}

function createAlphabetLetters() {
  const alphabetEl = document.getElementById("alphabet");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  alphabet.split("").forEach((letter) => {
    const span = document.createElement("span");
    span.innerText = letter;
    span.className = "alphabet_letter";
    span.onclick = () => handleAlphabetClick(letter);
    alphabetEl.appendChild(span);
  });
}

function showOverlay(letter) {
  const letterElement = Array.from(
    document.querySelectorAll(".alphabet_letter")
  ).find((el) => el.innerText === letter);

  if (!letterElement) return;

  const overlay = document.createElement("img");
  overlay.src = "../img/x.png";
  overlay.className = "overlay";

  const letterRect = letterElement.getBoundingClientRect();
  overlay.style.position = "absolute";
  overlay.style.top = `${letterRect.top - 3}px`;
  overlay.style.left = `${letterRect.left - 5}px`;
  overlay.style.width = "35px";
  overlay.style.height = `${letterRect.height}px`;
  overlay.style.zIndex = "1000";
  overlay.style.display = "block";

  letterElement.appendChild(overlay);
}

function endGame(result) {
  const gameWrapper = document.querySelector(".game_wrapper");
  gameWrapper.innerHTML = "";
  gameWrapper.style.marginRight = "20%";

  const message = document.createElement("h1");
  message.innerText = result === "win" ? "YOU WIN!" : "GAME OVER!";
  message.className = `result_title cs-b ${result === "win" ? "green" : "red"}`;
  gameWrapper.appendChild(message);

  if (result === "win") {
    const label = document.createElement("span");
    label.className = "next_choice";
    label.innerText = "Next Level";
    const nextLevelBtn = document.createElement("button");
    nextLevelBtn.id = "guess_btn";
    nextLevelBtn.onclick = () => {
      level++;
      startNewGame();
    };
    const btnWrapper = document.createElement("div");
    btnWrapper.className = "form";
    btnWrapper.appendChild(label);
    btnWrapper.appendChild(nextLevelBtn);
    gameWrapper.append(btnWrapper);
  } else {
    const label = document.createElement("span");
    label.className = "next_choice";
    label.innerText = "Try Again";
    const tryAgainBtn = document.createElement("button");
    tryAgainBtn.id = "guess_btn";
    tryAgainBtn.onclick = () => {
      level = 1;
      startNewGame();
    };
    const btnWrapper = document.createElement("div");
    btnWrapper.className = "form";
    btnWrapper.appendChild(label);
    btnWrapper.appendChild(tryAgainBtn);
    gameWrapper.append(btnWrapper);
  }

  const label = document.createElement("span");
  label.className = "next_choice";
  label.innerText = "Exit";
  const exitBtn = document.createElement("button");
  exitBtn.id = "guess_btn";
  exitBtn.onclick = () => {
    location.href = `home.html`;
  };
  const btnWrapper = document.createElement("div");
  btnWrapper.className = "form";
  btnWrapper.appendChild(label);
  btnWrapper.appendChild(exitBtn);
  gameWrapper.append(btnWrapper);
}

function startNewGame() {
  guessedLetters = [];
  attempts = 0;
  const gameWrapper = document.querySelector(".game_wrapper");
  gameWrapper.style.marginRight = "10%";
  gameWrapper.innerHTML = `
    <div id="word_display"></div>
      <div id="alphabet"></div>
      <div class="form">
        <input
          type="text"
          id="letter_input"
          maxlength="1"
          pattern="[A-Za-z]"
        />
        <button id="guess_btn"></button>
      </div> 
    </div>`;
  initialSetting();
  const guessButton = document.getElementById("guess_btn");
  guessButton.addEventListener("click", handleGuess);
}
