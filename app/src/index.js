import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from "url";

dotenv.config();
const app = express();


// Handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up" });
});

// Handle login form submission
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(`Login attempt by: ${email}`);
  // TODO: Add authentication logic
  res.redirect("/");
});

// Handle signup form submission
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  console.log(`Signup request: ${name} (${email})`);
  // TODO: Add user creation logic
  res.redirect("/login");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})