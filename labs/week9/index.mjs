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
app.get("/", async (req, res) => {
  let sql = `SELECT firstName, lastName, authorId FROM authors ORDER BY lastName`;
  const [rows] = await conn.query(sql);
  console.log(rows);
  res.render("home", { authors: rows });
});

app.get("/searchByKeyword", async (req, res) => {
  // let keyword = req.query.keyword;
  // let sql =
  //   "SELECT `firstName`, `lastName`, `quote` FROM `quotes` NATURAL JOIN authors WHERE quote LIKE ?";
  // let sqlParams = [`%${keyword}`];
  // const [rows] = await conn.query(sql, sqlParams);
  // console.log(keyword);

  res.render("quote.ejs", { rows: rows });
});

app.get("/dbTest", async (req, res) => {
  let sql = "SELECT CURDATE()";
  const [rows] = await conn.query(sql);
  res.send(rows);
}); //dbTest

app.listen(10040, () => {
  console.log("Express server running");
});
