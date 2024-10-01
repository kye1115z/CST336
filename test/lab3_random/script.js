document.querySelector("button").addEventListener("click", gradeQuiz);
var score = 0;
var attempts = localStorage.getItem("total_attempts") || 1;

displayQ2Choices();
displayQ3Choices();
displayQ4Choices();

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
  let q5Res = document.querySelector("#q5").value;

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

  // q5
  if (q5Res == 21) {
    rightAnswer(5);
  } else {
    wrongAnswer(5);
  }

  document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
  document.querySelector(
    "#totalAttempts"
  ).innerHTML = `Total Attempts: ${++attempts}`;
  localStorage.setItem("total_attempts", attempts);
}

function displayQ2Choices() {
  let optionsArray = [
    { value: "ms", label: "Mississippi" },
    { value: "mo", label: "Missouri" },
    { value: "co", label: "Colorado" },
    { value: "de", label: "Delaware" },
  ];
  optionsArray = _.shuffle(optionsArray);
  let q2Choices = document.querySelector("#q2");
  optionsArray.forEach((option) => {
    let optionEl = document.createElement("option");
    optionEl.value = option.value;
    optionEl.innerText = option.label;

    q2Choices.appendChild(optionEl);
  });
}

function displayQ3Choices() {
  let presidentsArray = [
    { id: "Jackson", label: "A.Jackson" },
    { id: "Franklin", label: "B.Franklin" },
    { id: "Jefferson", label: "T.Jefferson" },
    { id: "Roosevelt", label: "T.Roosevelt" },
  ];
  presidentsArray = _.shuffle(presidentsArray);
  let q3Choices = document.querySelector("#q3Choices");

  presidentsArray.forEach((item) => {
    let inputEl = document.createElement("input");
    inputEl.type = "checkbox";
    inputEl.id = item.id;

    let labelEl = document.createElement("label");
    labelEl.for = item.id;
    labelEl.innerText = item.label;

    labelEl.prepend(inputEl);

    q3Choices.appendChild(labelEl);
  });
}

function displayQ4Choices() {
  let q4Array = [
    { id: "me", value: "Maine" },
    { id: "ri", value: "Rhode Island" },
    { id: "md", value: "Maryland" },
    { id: "de", value: "Delaware" },
  ];
  q4Array = _.shuffle(q4Array);
  let q4Choices = document.querySelector("#q4Choices");

  for (item of q4Array) {
    let inputEl = document.createElement("input");
    inputEl.type = "radio";
    inputEl.id = item.id;
    inputEl.value = item.value;
    inputEl.name = "q4";

    let labelEl = document.createElement("label");
    labelEl.id = "q4label";
    labelEl.setAttribute("for", item.id);
    labelEl.innerText = item.value;

    labelEl.prepend(inputEl);

    q4Choices.appendChild(labelEl);
  }
}
