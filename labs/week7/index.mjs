import express from "express";
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/mercury", (req, res) => {
  res.render("mercury");
});

app.listen(3000, () => {
  console.log("server started");
});
