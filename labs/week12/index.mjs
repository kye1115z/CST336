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
  res.render("home");
});

app.get("/authors", async (req, res) => {
  let sql = `SELECT authorId, firstName, lastName
              FROM authors
              ORDER BY lastName`;
  const [rows] = await conn.query(sql);
  res.render("authors", { authors: rows });
});

app.get("/searchQuote", async (req, res) => {
  let sql = `SELECT firstName, lastName, authorId FROM authors ORDER BY lastName`;
  let category_sql = `SELECT DISTINCT(category) FROM quotes`;
  const [rows] = await conn.query(sql);
  const [categroy_rows] = await conn.query(category_sql);
  res.render("searchQuote", { authors: rows, category: categroy_rows });
});

app.get("/authors/new", async (req, res) => {
  res.render("addAuthor");
});

app.get("/authors/edit", async (req, res) => {
  let authorId = req.query.authorId;
  let sql = `SELECT * 
            FROM authors
            WHERE authorId = ?`;
  let [authorData] = await conn.query(sql, [authorId]);
  res.render("editAuthor", { authorData });
});

app.post("/author/edit", async (req, res) => {
  let authorId = req.body.authorId;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let biography = req.body.biography;

  let sql = `UPDATE authors SET firstName = ?, lastName = ?, biography = ? WHERE authorId = ?`;
  let sqlParams = [firstName, lastName, biography, authorId];
  await conn.query(sql, sqlParams);

  res.redirect("/authors");
});

// api로 활용 가능
app.get("/api/author/:authorId", async (req, res) => {
  let authorId = req.params.authorId;
  let sql = `SELECT * FROM authors WHERE authorId = ?`;
  let sqlParams = [authorId];
  const [rows] = await conn.query(sql, sqlParams);
  res.send(rows);
});

app.get("/searchByKeyword", async (req, res) => {
  let keyword = req.query.keyword;
  let sql =
    "SELECT `authorId`, `firstName`, `lastName`, `quote` FROM `quotes` NATURAL JOIN authors WHERE quote LIKE ?";
  let sqlParams = [`%${keyword}%`];
  const [rows] = await conn.query(sql, sqlParams);
  res.render("quote.ejs", { rows: rows });
});

app.get("/searchByAuthor", async (req, res) => {
  let author = req.query.author;
  let sql =
    "SELECT `firstName`, `lastName`, `quote` FROM `quotes` NATURAL JOIN authors WHERE authorId = ?";
  let sqlParams = [author];
  const [rows] = await conn.query(sql, sqlParams);

  res.render("quote.ejs", { rows: rows });
});

app.get("/searchByCategory", async (req, res) => {
  let category = req.query.category;
  let sql = `
    SELECT authors.firstName, authors.lastName, quotes.quote 
    FROM quotes 
    NATURAL JOIN authors 
    WHERE category = ?`;
  let sqlParams = [category];
  const [rows] = await conn.query(sql, sqlParams);
  res.render("quote.ejs", { rows: rows });
});

app.get("/searchByLikes", async (req, res) => {
  let min = req.query.min;
  let max = req.query.max;
  let sql = `
    SELECT authors.firstName, authors.lastName, quotes.quote 
    FROM quotes 
    NATURAL JOIN authors 
    WHERE quotes.likes >= ? AND quotes.likes <= ?`;
  let sqlParams = [min, max];
  const [rows] = await conn.query(sql, sqlParams);
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
