let today = new Date();
let year = today.getFullYear();

console.log(today);
console.log(year);

console.dir(today);
console.dir(year);

// current Month
let month = today.getMonth() + 1;
console.log(month);

// equal 1
if (month == "9") {
  console.log("September!");
} else {
  console.log("Not September!");
}

// strict equality
if (month === 9) {
  console.log("September!");
} else {
  console.log("Not September!");
}

// return month name function
function getMonthName(monthIndex) {
  if (monthIndex === 1) {
    console.log("January");
  } else if (monthIndex === 2) {
    console.log("Febuery");
  } else if (monthIndex === 3) {
    console.log("March");
  } else if (monthIndex === 4) {
    console.log("April");
  } else if (monthIndex === 5) {
    console.log("May");
  } else if (monthIndex === 6) {
    console.log("June");
  } else if (monthIndex === 7) {
    console.log("July");
  } else if (monthIndex === 8) {
    console.log("August");
  } else if (monthIndex === 9) {
    console.log("September");
  } else if (monthIndex === 10) {
    console.log("October");
  } else if (monthIndex === 11) {
    console.log("November");
  } else if (monthIndex === 12) {
    console.log("December");
  }

  /*
    // switch
    switch (monthIndex) {
        case 1: {
        return "January";
        break;
        }
    }
  */
}

let x = getMonthName(today.getMonth() + 1);

// function = display current date
function displayDate() {
  let dateString = today.toDateString();
  document.querySelector("h1").innerText = `Date: ${dateString}`;
}

// function = display current time
function displayCurrentTime() {
  let newDate = new Date();
  let currentTime = newDate.toLocaleTimeString();
  document.querySelector(
    "#currentTime"
  ).innerText = `CurrentTime: ${currentTime}`;
}
