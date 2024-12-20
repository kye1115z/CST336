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

app.get("/quotes", async (req, res) => {
  let sql = `SELECT quoteId, quote, category
              FROM quotes
              ORDER BY quoteId`;
  const [rows] = await conn.query(sql);
  res.render("quote", { rows: rows });
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
  console.log(authorData);
  res.render("editAuthor", { authorData });
});

app.get("/quotes/edit", async (req, res) => {
  let quoteId = req.query.quoteId;
  let sql = `SELECT * 
            FROM quotes
            WHERE quoteId = ?`;
  let author_sql = `SELECT firstName, lastName, authorId FROM authors ORDER BY lastName`;
  let category_sql = `SELECT DISTINCT(category) FROM quotes`;
  let [quoteData] = await conn.query(sql, [quoteId]);
  const [author_rows] = await conn.query(author_sql);
  const [categroy_rows] = await conn.query(category_sql);
  res.render("editQuote", {
    quoteData: quoteData,
    author_rows: author_rows,
    categroy_rows: categroy_rows,
  });
});

app.post("/author/edit", async (req, res) => {
  let authorId = req.body.authorId;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let gender = req.body.gender;
  let biography = req.body.biography;
  let picture = req.body.picture;
  let dob = req.body.dob;
  let dod = req.body.dod;
  console.log(dob);
  console.log(dod);

  let sql = `UPDATE authors SET firstName = ?, lastName = ?, sex = ?, biography = ?, portrait = ?, dob = ?, dod = ? WHERE authorId = ?`;
  let sqlParams = [
    firstName,
    lastName,
    gender,
    biography,
    picture,
    dob,
    dod,
    authorId,
  ];
  await conn.query(sql, sqlParams);

  res.redirect("/authors");
});

app.post("/quotes/edit", async (req, res) => {
  let quoteId = req.body.quoteId;
  let quote = req.body.quote;
  let authorId = req.body.authorId;
  let category = req.body.category;
  let likes = req.body.likes;

  let sql = `UPDATE quotes SET quote = ?, authorId = ?, category = ?, likes = ? WHERE quoteId = ?`;
  let sqlParams = [quote, authorId, category, likes, quoteId];
  await conn.query(sql, sqlParams);

  res.redirect("/quotes");
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
