import express, { query } from "express";
import mysql from "mysql2/promise";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const pool = mysql.createPool({
  host: "yeyeeun.online",
  user: "yeyeeuno_webuser3",
  password: "Cst-336",
  database: "yeyeeuno_fe",
  connectionLimit: 10,
  waitForConnections: true,
});
const conn = await pool.getConnection();

app.get("/", async (req, res) => {
  res.render("home");
});

app.get("/addComic", async (req, res) => {
  res.render("addComic");
});

app.get("/comic", async (req, res) => {
  res.render("displayComic");
});

app.get("/addComment", async (req, res) => {
  res.render("addComment");
});

// api
app.get("/api/comic_sites", async (req, res) => {
  try {
    const sql = "SELECT * FROM `fe_comic_sites`;";
    const [comic_sties] = await conn.query(sql);
    res.json(comic_sties);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/random_comic", async (req, res) => {
  try {
    const number_sql = "SELECT COUNT(1) totalRecords FROM fe_comics;";
    const sql = "SELECT * FROM `fe_comics` WHERE comicId = ?;";
    const number = await conn.query(number_sql);
    let randomRecord = Math.floor(
      Math.random() * (number[0][0].totalRecords - 1)
    );
    const [random_comic] = await conn.query(sql, randomRecord);
    res.json(random_comic);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Internal Server Error");
  }
});

//dbTest
app.get("/dbTest", async (req, res) => {
  let sql = "SELECT CURDATE()";
  const [rows] = await conn.query(sql);
  res.send(rows);
});

app.listen(10040, () => {
  console.log("Express server running");
});
