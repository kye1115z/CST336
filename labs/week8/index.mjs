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
  const { month, day, year } = req.query;
  const date = `${year}-${month}-${day}`;
  console.log(date);
  let nasaData = await getNasaData(date);
  res.render("nasa", { nasaData });
});

app.get("/planetInfo", async (req, res) => {
  let body = req.query.selectedBody;
  let bodyInfo = {
    description: "",
    image: "",
  };

  if (body === "Comets") {
    bodyInfo.description = planets.getComets().def;
    bodyInfo.image = planets.getComets().image;
  } else if (body === "Asteriods") {
    bodyInfo.description = planets.getAsteroids().def;
    bodyInfo.image = planets.getAsteroids().image;
  } else if (body === "Mercury") {
    bodyInfo.description = planets.getMercury().description;
    bodyInfo.image = planets.getMercury().image;
  } else if (body === "Venus") {
    bodyInfo.description = planets.getVenus().description;
    bodyInfo.image = planets.getVenus().image;
  } else if (body === "Earth") {
    bodyInfo.description = planets.getEarth().description;
    bodyInfo.image = planets.getEarth().image;
  } else if (body === "Mars") {
    bodyInfo.description = planets.getMars().description;
    bodyInfo.image = planets.getMars().image;
  } else if (body === "Jupiter") {
    bodyInfo.description = planets.getJupiter().description;
    bodyInfo.image = planets.getJupiter().image;
  } else if (body === "Saturn") {
    bodyInfo.description = planets.getSaturn().description;
    bodyInfo.image = planets.getSaturn().image;
  } else if (body === "Uranus") {
    bodyInfo.description = planets.getUranus().description;
    bodyInfo.image = planets.getUranus().image;
  } else if (body === "Neptune") {
    bodyInfo.description = planets.getNeptune().description;
    bodyInfo.image = planets.getNeptune().image;
  }

  console.log(bodyInfo);

  res.render("celestialBody", { celestialBodyInfo: bodyInfo });
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

async function getNasaData(date) {
  // date를 사용하여 API 호출 로직을 추가
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?&api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=${date}`
  );
  const data = await response.json();
  console.log(data);
  return data;
}
