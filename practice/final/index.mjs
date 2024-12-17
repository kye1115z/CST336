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

// get
app.get("/", async (req, res) => {
  res.render("home");
});

app.get("/addComic", async (req, res) => {
  res.render("addComic");
});

app.get("/comic", async (req, res) => {
  let comicSiteId = req.query.comicSiteId;
  const sql = `SELECT * FROM fe_comics WHERE comicSiteId = ?;`;
  const [comics] = await conn.query(sql, [comicSiteId]);

  res.render("displayComic", { comics });
});

app.get("/comment", async (req, res) => {
  res.render("comment");
});

app.get("/addComment", async (req, res) => {
  let comicId = req.query.comicId;
  const sql = `SELECT * FROM fe_comics WHERE comicId = ?;`;
  const [comic] = await conn.query(sql, [comicId]);
  res.render("addComment", { comicId, comic: comic[0] });
});

// post
app.post("/addComic", async (req, res) => {
  const { title, url, publish_date, website } = req.body;
  try {
    const sql = `INSERT INTO fe_comics (comicUrl, comicTitle, comicSiteId, comicDate) VALUES (?, ?, ?, ?);`;
    const sqlParams = [url, title, website, publish_date];
    await conn.query(sql, sqlParams);
    res.redirect(`/comic?comicSitedId=${website}`);
  } catch (error) {
    console.error("Error posting new comic:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addComment", async (req, res) => {
  const { username, email, comment, comicId } = req.body;
  try {
    const sql = `INSERT INTO fe_comments (author, email, comment, comicId) VALUES (?, ?, ?, ?);`;
    const sqlParams = [username, email, comment, comicId];
    await conn.query(sql, sqlParams);
    res.redirect(`/`);
  } catch (error) {
    console.error("Error posting new comic:", error);
    res.status(500).send("Internal Server Error");
  }
});

// api
app.get("/api/comic_sites", async (req, res) => {
  try {
    const sql = "SELECT * FROM `fe_comic_sites`;";
    const [comic_sties] = await conn.query(sql);
    res.json(comic_sties);
  } catch (error) {
    console.error("Error fetching comic sites:", error);
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

app.get("/api/comments", async (req, res) => {
  let comicId = req.query.comicId;
  try {
    const sql = "SELECT * FROM `fe_comic_sites`;";
    const [comic_sties] = await conn.query(sql);
    res.json(comic_sties);
  } catch (error) {
    console.error("Error fetching comic sites:", error);
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
