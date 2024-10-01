document.querySelector("button").addEventListener("click", gradeQuiz);
var score = 0;

function isFormValid() {
  let isValid = true;
  let qArray = [];
  if (document.querySelector("#q1").value == "") {
    qArray.push("1 ");
    isValid = false;
  }

  if (document.querySelector("#q2").value == "") {
    qArray.push("2 ");
    isValid = false;
  }

  if (!isValid) {
    document.querySelector(
      "#validationFdbk"
    ).innerHTML = `Question ${qArray} was not answered`;
  }
  return isValid;
}

function rightAnswer(index) {
  document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
  document.querySelector(`#q${index}Feedback`).className =
    "bg-success text-white";
  //   document.querySelector(`#markImg${index}`).innerHTML =
  //     "<img src='img/checkmark.png' alt='Checkmark'>";
  score += 20;
}

function wrongAnswer(index) {
  document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
  document.querySelector(`#q${index}Feedback`).className =
    "bg-warning text-white";
  //   document.querySelector(`#markImg${index}`).innerHTML =
  //     "<img src='img/xmark.png' alt='Checkmark'>";
}

function gradeQuiz() {
  console.log("grade...");
  document.querySelector("#validationFdbk").innerHTML = "";
  if (!isFormValid()) {
    return;
  }

  score = 0;
  let q1Res = document.querySelector("#q1").value.toLowerCase();
  let q2Res = document.querySelector("#q2").value;
  let q4Res = document.querySelector("input[name=q4]:checked").value;

  //   q1
  if (q1Res == "sacramento") {
    rightAnswer(1);
  } else {
    wrongAnswer(1);
  }

  //   q2
  if (q2Res == "mo") {
    rightAnswer(2);
  } else {
    wrongAnswer(2);
  }

  //   q3
  if (
    document.querySelector("#Jefferson").checked &&
    document.querySelector("#Roosevelt").checked &&
    !document.querySelector("#Jackson").checked &&
    !document.querySelector("#Franklin").checked
  ) {
    rightAnswer(3);
  } else {
    wrongAnswer(3);
  }

  //   q4
  if (q4Res == "Rhode Island") {
    rightAnswer(4);
  } else {
    wrongAnswer(4);
  }
  document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
}
