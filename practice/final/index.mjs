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

//dbTest
app.get("/dbTest", async (req, res) => {
  let sql = "SELECT CURDATE()";
  const [rows] = await conn.query(sql);
  res.send(rows);
});

app.listen(10040, () => {
  console.log("Express server running");
});
