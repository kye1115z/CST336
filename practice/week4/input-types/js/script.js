// Event Listeners

document
  .querySelector("#textColorBtn")
  .addEventListener("click", changeTextColor);
document
  .querySelector("#textSizeBtn")
  .addEventListener("click", changeTextSize);
document.querySelector("#bgColorBtn").addEventListener("click", changeBgColor);
document.querySelector("#alignment").addEventListener("click", changeAlignment);

function changeTextColor() {
  let textColor = document.querySelector("#textColor").value;
  document.querySelector("body").style.color = textColor;
}

function changeTextSize() {
  let textSize = document.querySelector("#textSize").value;
  document.querySelector("body").style.fontSize = `${textSize}em`;
}

function changeBgColor() {
  let bc = document.querySelector("#bgColor").value;
  document.querySelector("body").style.backgroundColor = bc;
}

function changeAlignment() {
  let alignment = document.querySelector("#alignment").checked;
  if (alignment) {
    document.querySelector("body").style.textAlign = "center";
  } else {
    document.querySelector("body").style.textAlign = "left";
  }
}
