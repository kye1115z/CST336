document.querySelector("#submit").addEventListener("click", checkScore);

function checkScore() {
  let score = document.querySelector("#score").value;
  let grade = document.querySelector("#grade");
  if (score >= 95) {
    grade.innerText = "A+";
  } else if (score >= 90) {
    grade.innerText = "A";
  } else if (score >= 85) {
    grade.innerText = "B+";
  } else if (score >= 80) {
    grade.innerText = "B";
  }
}
