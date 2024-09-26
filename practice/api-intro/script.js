displayMovieData();

async function displayMovieData() {
  let url = "https://www.omdbapi.com/?apikey=12215ee6&s=beetlejuice";

  let res = await fetch(url);
  let data = await res.json();
  console.log(data);

  for (let movie of data.Search) {
    let h1El = document.createElement("h1");
    h1El.innerText = movie.Title;
    document.querySelector("#movies").appendChild(h1El);

    let imgEl = document.createElement("img");
    imgEl.src = movie.Poster;
    document.querySelector("#movies").appendChild(imgEl);
  }
}
