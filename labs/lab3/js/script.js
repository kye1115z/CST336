let attempts = localStorage.getItem("quizAttempts") || 1;
localStorage.setItem("quizAttempts", attempts);
document.querySelector("#attempts").innerText = `Attempts: ${attempts}`;

document.querySelector("#grade_btn").addEventListener("click", gradeQuiz);

displayQ1Choices();
displayQ2Choices();
displayQ3Choices();
displayQ4Choices();
displayQ5Choices();

function gradeQuiz() {
  let totalGrade = 0;
  let q1Answer = document.querySelector("#q1input").value;
  let q2Answer = document.querySelector("input[name=q2]:checked").value;
  let q3Answer = document.querySelector("input[name=q3]:checked").value;
  let q4Answer = document.querySelector("select").value;
  let q5Answer = document.querySelector("#q5input").value;
  let q1W = document.querySelector("#q1Answer");
  let q2W = document.querySelector("#q2Answer");
  let q3W = document.querySelector("#q3Answer");
  let q4W = document.querySelector("#q4Answer");
  let q5W = document.querySelector("#q5Answer");
  let q1A = document.querySelector("#q1AnswerSpan");
  let q2A = document.querySelector("#q2AnswerSpan");
  let q3A = document.querySelector("#q3AnswerSpan");
  let q4A = document.querySelector("#q4AnswerSpan");
  let q5A = document.querySelector("#q5AnswerSpan");
  let q1I = document.querySelector("#q1I");
  let q2I = document.querySelector("#q2I");
  let q3I = document.querySelector("#q3I");
  let q4I = document.querySelector("#q4I");
  let q5I = document.querySelector("#q5I");
  q1W.style.display = "flex";
  q2W.style.display = "flex";
  q3W.style.display = "flex";
  q4W.style.display = "flex";
  q5W.style.display = "flex";

  // 1
  if (q1Answer === "display") {
    totalGrade += 20;
    q1A.innerText = "Correct!";
    q1W.style.backgroundColor = "#45C486";
    q1I.src = `../svg/correct.svg`;
  } else {
    q1A.innerText = "Wrong! The answer was 'display'";
    q1W.style.backgroundColor = "#D9534F";
    q1I.src = `../svg/wrong.svg`;
  }
  // 2
  if (q2Answer === "color") {
    totalGrade += 20;
    q2A.innerText = "Correct!";
    q2W.style.backgroundColor = "#45C486";
    q2I.src = "../svg/correct.svg";
  } else {
    q2A.innerText = "Wrong! The answer was 'color'";
    q2W.style.backgroundColor = "#D9534F";
    q2I.src = "../svg/wrong.svg";
  }
  // 3
  if (q3Answer === "fixed") {
    totalGrade += 20;
    q3A.innerText = "Correct!";
    q3W.style.backgroundColor = "#45C486";
    q3I.src = "../svg/correct.svg";
  } else {
    q3A.innerText = "Wrong! The answer was 'fixed'";
    q3W.style.backgroundColor = "#D9534F";
    q3I.src = "../svg/wrong.svg";
  }
  // 4
  if (q4Answer === "margin") {
    totalGrade += 20;
    q4A.innerText = "Correct!";
    q4W.style.backgroundColor = "#45C486";
    q4I.src = "../svg/correct.svg";
  } else {
    q4A.innerText = "Wrong! The answer was 'margin'";
    q4W.style.backgroundColor = "#D9534F";
    q4I.src = "../svg/wrong.svg";
  }
  // 5
  if (q5Answer == 1) {
    totalGrade += 20;
    q5A.innerText = "Correct!";
    q5W.style.backgroundColor = "#45C486";
    q5I.src = "../svg/correct.svg";
  } else {
    q5A.innerText = "Wrong! The answer was '1'";
    q5W.style.backgroundColor = "#D9534F";
    q5I.src = "../svg/wrong.svg";
  }

  if (totalGrade >= 80) {
    document.querySelector(
      "#total_grade"
    ).innerHTML = `Congratulations! You scored a high grade! <br />Your grade: ${totalGrade}`;
  } else {
    document.querySelector(
      "#total_grade"
    ).innerHTML = `Your grade: ${totalGrade}`;
  }
  attempts++;
  localStorage.setItem("quizAttempts", attempts);
}

function displayQ1Choices() {
  let inputEl = document.createElement("input");
  inputEl.id = "q1input";
  inputEl.name = "q1";
  inputEl.type = "text";

  let labelEl = document.createElement("label");
  labelEl.prepend(inputEl);

  document.querySelector("#q1Choices").appendChild(labelEl);
}

function displayQ2Choices() {
  let q2Choices = ["color", "font-color", "text-color", "fontColor"];
  q2Choices = _.shuffle(q2Choices);

  // 방법 1 : 로딩 시간 오래 걸림
  // document.querySelector("#q2Choices").innerHTML = `
  //   <label> <input name="q2" type="radio" value="${q2Choices[0]}" /> ${q2Choices[0]} </label>
  // `;

  // 방법 2 : DOM 구조 직접 만들어주기
  for (let choice of q2Choices) {
    let inputEl = document.createElement("input");
    inputEl.id = "q2input";
    inputEl.name = "q2";
    inputEl.type = "radio";
    inputEl.value = choice;

    let labelEl = document.createElement("label");
    labelEl.id = "q2label";
    labelEl.innerText = choice;

    labelEl.prepend(inputEl);

    document.querySelector("#q2Choices").appendChild(labelEl);
  }
}

function displayQ3Choices() {
  let q3Choices = ["static", "fixed", "relative"];
  q3Choices = _.shuffle(q3Choices);

  for (let choice of q3Choices) {
    let inputEl = document.createElement("input");
    inputEl.name = "q3";
    inputEl.type = "checkbox";
    inputEl.value = choice;

    let labelEl = document.createElement("label");
    labelEl.id = "q3label";
    labelEl.innerText = choice;

    labelEl.prepend(inputEl);

    document.querySelector("#q3Choices").appendChild(labelEl);
  }
}

function displayQ4Choices() {
  let q4Choices = ["text-align", "margin", "float"];
  q4Choices = _.shuffle(q4Choices);

  let selectEl = document.createElement("select");
  let labelEl = document.createElement("label");

  for (let choice of q4Choices) {
    let optionEl = document.createElement("option");
    optionEl.value = choice;
    optionEl.innerText = choice;

    selectEl.prepend(optionEl);
  }
  labelEl.prepend(selectEl);

  document.querySelector("#q4Choices").appendChild(labelEl);
}

function displayQ5Choices() {
  let inputEl = document.createElement("input");
  inputEl.id = "q5input";
  inputEl.name = "q5";
  inputEl.type = "number";

  let labelEl = document.createElement("label");
  labelEl.prepend(inputEl);

  document.querySelector("#q5Choices").appendChild(labelEl);
}
