let weekdays = ["Wednesday"];

// Adding Values
weekdays.push("Thursday", "Friday"); // end
weekdays.unshift("Monday", "Tuesday"); // start

// Accessing Array Items

// Deleting items
weekdays.splice(1, 1, "Martes");
console.log(weekdays);

//  Randomizing an Array
let shuffledWeekdays = _.shuffle(weekdays);
console.group(shuffledWeekdays);

// Looping through an Array
for (let i of weekdays) {
  console.log(i);
}
