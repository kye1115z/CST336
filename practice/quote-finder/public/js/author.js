document.querySelector("form").addEventListener("submit", validateAuthor);

function validateAuthor(event) {
  let fName = document.querySelector("input[name=firstName]").value;

  let isValid = true;

  if (fName.length < 3) {
    alert("Fist name must have at least 3 characters");
    isValid = false;
  }

  if (!isValid) {
    event.preventDefault();
  }
}
