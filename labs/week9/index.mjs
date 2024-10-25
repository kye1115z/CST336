import express, { query } from "express";
import mysql from "mysql2/promise";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

const pool = mysql.createPool({
  host: "yeyeeun.online",
  user: "yeyeeuno_webuser3",
  password: "Cst-336",
  database: "yeyeeuno_quotetest",
  connectionLimit: 10,
  waitForConnections: true,
});
const conn = await pool.getConnection();

//routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/allAuthors", async (req, res) => {
  let query =
    "SELECT `authorId`, `firstName`, `lastName`, `country` FROM `authors` WHERE 1";
  const [rows] = await conn.query(query);
  console.log(rows);
  res.render("authorList", { rows: rows });
});

app.get("/womanAuthors", async (req, res) => {
  let query =
    "SELECT `authorId`, `firstName`, `lastName`, `country` FROM `authors` WHERE `sex` = ?";
  let params = ["F"];
  const [rows] = await conn.query(query, params);
  console.log(rows);
  res.render("authorList", { rows: rows });
});

app.get("/allQuotes", async (req, res) => {
  let query = "SELECT `quote` FROM `quotes` ORDER BY `quote` ASC;";
  const [rows] = await conn.query(query);
  console.log(rows);
  res.render("quotesList", { rows: rows });
});

app.get("/inspirationalQuotes", async (req, res) => {
  let query = "SELECT `quote` FROM `quotes` WHERE `category` = 'Inspirational'";
  const [rows] = await conn.query(query);
  console.log(rows);
  res.render("quotesList", { rows: rows });
});

app.get("/lifeQuotes", async (req, res) => {
  let query = "SELECT `quote` FROM `quotes` WHERE `quote` LIKE ?";
  let params = [`%${"life"}%`];
  const [rows] = await conn.query(query, params);
  console.log(rows);
  res.render("quotesList", { rows: rows });
});

app.get("/wisdomQuotes", async (req, res) => {
  let query =
    "SELECT `quote` FROM `quotes` WHERE `category` = 'Wisdom' AND `quote` LIKE ?";
  let params = [`%${"things"}%`];
  const [rows] = await conn.query(query, params);
  console.log(rows);
  res.render("quotesList", { rows: rows });
});

app.get("/likeQuotes", async (req, res) => {
  let query =
    "SELECT `quote` FROM `quotes` WHERE `likes` >= 50 AND `likes` <= 100";
  const [rows] = await conn.query(query);
  console.log(rows);
  res.render("quotesList", { rows: rows });
});

app.get("/categoryList", async (req, res) => {
  let query =
    "SELECT DISTINCT `category` FROM `quotes` ORDER BY `category` ASC;";
  const [rows] = await conn.query(query);
  console.log(rows);
  res.render("quotesList", { rows: rows });
});

app.get("/topQuotes", async (req, res) => {
  let query =
    "SELECT `quote`, `likes` FROM `quotes` ORDER BY `likes` DESC LIMIT 3;";
  const [rows] = await conn.query(query);
  console.log(rows);
  res.render("quotesList", { rows: rows });
});

app.get("/authorPhotos", async (req, res) => {
  let query = "SELECT DISTINCT `portrait` FROM `authors`";
  const [rows] = await conn.query(query);
  console.log(rows);
  res.render("authorPhotos", { rows: rows });
});

app.get("/dbTest", async (req, res) => {
  let sql = "SELECT CURDATE()";
  const [rows] = await conn.query(sql);
  res.send(rows);
}); //dbTest

app.listen(10040, () => {
  console.log("Express server running");
});
