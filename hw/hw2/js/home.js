function selectCategory(category) {
  location.href = `game.html?category=${category}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const animalButton = document.getElementById("animals");
  const fruitButton = document.getElementById("fruits");
  const countryButton = document.getElementById("countries");
  const professionButton = document.getElementById("professions");

  animalButton.addEventListener("click", () => selectCategory("animals"));
  fruitButton.addEventListener("click", () => selectCategory("fruits"));
  countryButton.addEventListener("click", () => selectCategory("countries"));
  professionButton.addEventListener("click", () =>
    selectCategory("professions")
  );
});
