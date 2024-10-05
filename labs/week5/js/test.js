document.querySelector("#stateSelect").addEventListener("change", getCounties);
document
  .querySelector("#usernameInput")
  .addEventListener("input", checkUsername);
document.querySelector("#pwInput").addEventListener("click", generatePw);
document.querySelector("#pwInput").addEventListener("input", pwLength);
document.querySelector("#checkPwInput").addEventListener("input", checkPw);

let pwAlarm = document.querySelector("#pwAlarm");

async function getCounties() {
  let selectedState = document.querySelector("#stateSelect").value;
  let countyUrl = `https://csumb.space/api/countyListAPI.php?state=${selectedState}`;
  let resCounty = await fetch(countyUrl).then((res) => res.json());

  let countySelect = document.querySelector("#countySelect");
  // clear options
  while (countySelect.options.length > 1) {
    countySelect.remove(1);
  }

  for (let i = 0; i < resCounty.length; i++) {
    let option = document.createElement("option");
    option.id = resCounty[i].county;
    option.value = resCounty[i].county;
    option.textContent = resCounty[i].county;
    countySelect.appendChild(option);
  }
}

async function checkUsername() {
  let username = document.querySelector("#usernameInput").value;
  let userUrl = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
  let resUser = await fetch(userUrl).then((res) => res.json());

  let usernameAlarm = document.querySelector("#usernameAlarm");
  if (resUser.available) {
    usernameAlarm.innerText = "Available";
    usernameAlarm.style.color = "green";
  } else {
    usernameAlarm.innerText = "Not Available";
    usernameAlarm.style.color = "red";
  }
}

async function generatePw() {
  let resPw = await fetch(
    `https://csumb.space/api/suggestedPassword.php?length=8`
  ).then((res) => res.json());
  document.querySelector("#pw").innerText = resPw.password;
}

async function pwLength() {
  let pw = document.querySelector("#pwInput").value;
  if (pw.length < 6) {
    pwAlarm.innerText = "The password must be at least 6 characters long";
    pwAlarm.style.color = "red";
  } else {
    pwAlarm.innerText = "";
  }
}

async function checkPw() {
  let pw = document.querySelector("#pwInput").value;
  let pwCheck = document.querySelector("#checkPwInput").value;
  if (pw !== pwCheck) {
    pwAlarm.innerText = "Passwords do not match!";
    pwAlarm.style.color = "red";
  } else {
    pwAlarm.innerText = "";
  }
}
