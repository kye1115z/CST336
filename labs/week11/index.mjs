import express, { query } from "express";
import mysql from "mysql2/promise";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.get("/addAuthor", async (req, res) => {
  // Like a link to the add author form
  res.render("addAuthor");
});

app.post("/addAuthor", async (req, res) => {
  // What happens when you submit a new author
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let bio = req.body.biography;
  let gender = req.body.gender;
  let picture = req.body.picture;
  let dob = req.body.dob;
  let dod = req.body.dod;

  console.log(firstName, lastName, bio, gender, picture, dob, dod);

  let sql = `INSERT INTO authors
              (firstName, lastName, biography)
              VALUES (?, ?, ?)`;
  console.log(firstName, lastName, bio);
  let params = [firstName, lastName, bio];
  const [rows] = await conn.query(sql, params);
  console.log(rows);
  res.render("addAuthor");
});

app.get("/addQuote", async (req, res) => {
  let author_sql = `SELECT firstName, lastName, authorId FROM authors ORDER BY lastName`;
  let category_sql = `SELECT DISTINCT(category) FROM quotes`;
  const [author_rows] = await conn.query(author_sql);
  const [categroy_rows] = await conn.query(category_sql);
  res.render("newQuote", { authors: author_rows, category: categroy_rows });
});

app.post("/addQuote", async (req, res) => {
  // What happens when you submit a new author
  let quote = req.body.quote;
  let authorId = req.body.author;
  let category = req.body.category;

  let sql = `INSERT INTO quotes
              (quote, authorId, category)
              VALUES (?, ?, ?)`;
  let params = [quote, authorId, category];
  const [rows] = await conn.query(sql, params);
  console.log(rows);
  res.render("addAuthor");
});

app.get("/Lists", async (req, res) => {
  let author_sql = `SELECT firstName, lastName, authorId FROM authors ORDER BY lastName`;
  let quote_sql = `SELECT quote, category FROM quotes`;
  const [author_rows] = await conn.query(author_sql);
  const [quote_rows] = await conn.query(quote_sql);
  res.render("lists", { quote: quote_rows, authors: author_rows });
});

app.get("/dbTest", async (req, res) => {
  let sql = "SELECT CURDATE()";
  const [rows] = await conn.query(sql);
  res.send(rows);
}); //dbTest

app.listen(3001, () => {
  console.log("Express server running");
});
