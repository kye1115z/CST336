import express, { query } from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import session from "express-session";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//initializing sessions
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

const pool = mysql.createPool({
  host: "yeyeeun.online",
  user: "yeyeeuno_webuser3",
  password: "Cst-336",
  database: "yeyeeuno_quotetest",
  connectionLimit: 10,
  waitForConnections: true,
});
const conn = await pool.getConnection();

// global
let authenticated = false;

//routes
app.get("/", async (req, res) => {
  res.render("login");
});

app.get("/logout", async (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let passwordHash = ``;

  let sql = `SELECT * 
            FROM admin 
            WHERE username = ?`;
  let sqlParams = [username];
  const [rows] = await conn.query(sql, sqlParams);
  if (rows.length > 0) {
    passwordHash = rows[0].password;
  }

  const match = await bcrypt.compare(password, passwordHash);

  if (match) {
    req.session.fullName = rows[0].firstName + " " + rows[0].lastName;
    req.session.authenticated = true;
    res.render("welcome");
  } else {
    res.redirect("/");
  }
});

app.get("/profile", async (req, res) => {
  if (req.session.authenticated) {
    res.render("profile");
  } else {
    res.redirect("/");
  }
});

app.get("/settings", isAuthenticated, async (req, res) => {
  res.render("settings");
});

//dbTest
app.get("/dbTest", async (req, res) => {
  let sql = "SELECT CURDATE()";
  const [rows] = await conn.query(sql);
  res.send(rows);
});

// Middleware functions
function isAuthenticated(req, res, next) {
  if (req.session.quthenticated) {
    next();
  } else {
    res.redirect("/");
  }
}

app.listen(10040, () => {
  console.log("Express server running");
});
