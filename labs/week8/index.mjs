import express from "express";
const planets = (await import("npm-solarsystem")).default;
const ACCESS_KEY = "LZTg9NbqauEpUq14vj8GhthqOF3aXTcqYqf2_UfB2_s";
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const imageUrl = await randomImage();
  res.render("home", { imageUrl });
  // res.render("home");
});

app.get("/mercury", (req, res) => {
  let mercuryInfo = planets.getMercury();
  res.render("mercury", { mercuryData: mercuryInfo });
});

app.get("/venus", (req, res) => {
  let venusInfo = planets.getVenus();
  res.render("venus", { venusData: venusInfo });
});

app.get("/mars", (req, res) => {
  let marsInfo = planets.getMars();
  res.render("mars", { marsData: marsInfo });
});

app.get("/saturn", (req, res) => {
  let saturnInfo = planets.getSaturn();
  res.render("saturn", { saturnData: saturnInfo });
});

app.get("/nasa", async (req, res) => {
  let nasaData = await getNasaData();
  res.render("nasa", { nasaData });
});

app.listen(3000, () => {
  console.log("server started");
});

async function randomImage() {
  let url = `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}&featured=true&query=solar%20system&orientation=landscape`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.urls.regular;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

async function getNasaData() {
  let url = `https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=2024-10-10`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}
