// address
getState();
document.querySelector("#zip_code_input").addEventListener("input", getZipcode);
document.querySelector("#state_select").addEventListener("change", getCounties);
// userInfo
document
  .querySelector("#username_input")
  .addEventListener("input", checkUsername);
document.querySelector("#password").addEventListener("click", generatePwd);
document.querySelector("#password").addEventListener("input", checkPwdLength);
document.querySelector("#confirm_pwd").addEventListener("input", confirmPwd);
// submit btn
document.querySelector("#sign_up_btn").addEventListener("click", submitForm);

async function getZipcode() {
  let zipcode = document.querySelector("#zip_code_input").value;
  let zipcodeAlert = document.querySelector("#zip_code_alert");
  if (zipcode.length === 0) {
    zipcodeAlert.style.display = "none";
    document.querySelector("#city").innerText = "";
    document.querySelector("#latitude").innerText = "";
    document.querySelector("#lontitude").innerText = "";
    return;
  }
  let zipUrl = `https://csumb.space/api/cityInfoAPI.php?zip=${zipcode}`;
  let resZip = await fetch(zipUrl).then((res) => res.json());

  if (resZip && resZip.city) {
    zipcodeAlert.style.display = "none";
    document.querySelector("#city").innerText = resZip.city;
    document.querySelector("#latitude").innerText = resZip.latitude;
    document.querySelector("#lontitude").innerText = resZip.longitude;
  } else {
    zipcodeAlert.style.display = "inline";
    zipcodeAlert.innerText = "Zip code not found";
    zipcodeAlert.style.color = "#EB0029";
    document.querySelector("#city").innerText = "";
    document.querySelector("#latitude").innerText = "";
    document.querySelector("#lontitude").innerText = "";
  }
}

async function getState() {
  let stateUrl = `https://csumb.space/api/allStatesAPI.php`;
  let resState = await fetch(stateUrl).then((res) => res.json());
  let stateSelect = document.querySelector("#state_select");

  for (let i = 0; i < resState.length; i++) {
    let option = document.createElement("option");
    option.id = resState[i].usps;
    option.value = resState[i].usps;
    option.textContent = resState[i].state;
    stateSelect.appendChild(option);
  }
}

async function getCounties() {
  let selectedState = document.querySelector("#state_select").value;
  let countyUrl = `https://csumb.space/api/countyListAPI.php?state=${selectedState}`;
  let resCounty = await fetch(countyUrl).then((res) => res.json());

  let countySelect = document.querySelector("#county_select");

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
  let username = document.querySelector("#username_input").value;
  let userUrl = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
  let resUser = await fetch(userUrl).then((res) => res.json());

  let usernameAlarm = document.querySelector("#username_alert");
  if (username.length >= 3) {
    if (resUser.available) {
      usernameAlarm.innerText = "Available!";
      usernameAlarm.style.color = "#28A745";
    } else {
      usernameAlarm.innerText = "This name is already taken!";
      usernameAlarm.style.color = "#EB0029";
    }
  } else {
    usernameAlarm.innerText = "Username must have at least 3 characters.";
    usernameAlarm.style.color = "#EB0029";
  }
}

async function generatePwd() {
  let resPw = await fetch(
    `https://csumb.space/api/suggestedPassword.php?length=8`
  ).then((res) => res.json());
  document.querySelector("#pwd_ex").innerText = resPw.password;
}

async function checkPwdLength() {
  let pwd = document.querySelector("#password").value;
  let pwdAlert = document.querySelector("#password_alert");
  if (pwd.length >= 6) {
    pwdAlert.style.color = "#28A745";
  } else {
    pwdAlert.style.color = "#EB0029";
  }
}

async function confirmPwd() {
  let pwd = document.querySelector("#password").value;
  let pwdCheck = document.querySelector("#confirm_pwd").value;
  let pwdAlert = document.querySelector("#confirm_pwd_alert");
  if (pwd !== pwdCheck) {
    pwdAlert.innerText = "Passwords do not match!";
    pwdAlert.style.color = "#EB0029";
  } else {
    pwdAlert.innerText = "Passwords match!";
    pwdAlert.style.color = "#28A745";
  }
}

function submitForm() {
  let firstName = document.querySelector("#first_name").value;
  let lastName = document.querySelector("#last_name").value;
  //   let email = document.querySelector("#email").value;
  //   let zipcode = document.querySelector("#zip_code_input").value;
  //   let contact = document.querySelector("#contact").value;
  //   let state = document.querySelector("#state_select").value;
  //   let county = document.querySelector("#county_select").value;
  let username = document.querySelector("#username_input").value;
  let password = document.querySelector("#password").value;
  let confirmPwd = document.querySelector("#confirm_pwd").value;

  if (username.length < 3) {
    alert("Username must be at least 3 characters long.");
    return false;
  }
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }
  if (password !== confirmPwd) {
    alert("Passwords do not match.");
    return false;
  }

  alert(`Thank you, ${firstName} ${lastName}`);
}

// color change(input focus)
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focus", function () {
    const label = document.querySelector(`label[for=${this.id}]`);
    label.style.color = "#EB0029";
  });

  input.addEventListener("blur", function () {
    const label = document.querySelector(`label[for=${this.id}]`);
    label.style.color = "#979692";
  });
});

// contact format
document.getElementById("contact").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 0) {
    if (value.length > 3 && value.length <= 6) {
      value = value.slice(0, 3) + " " + value.slice(3);
    } else if (value.length > 6) {
      value =
        value.slice(0, 3) + " " + value.slice(3, 6) + " " + value.slice(6, 10);
    }
  }
  e.target.value = value;
});
