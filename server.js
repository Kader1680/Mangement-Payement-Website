const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const session = require('express-session');
const bcrypt = require("bcrypt");
const uri = "mongodb://localhost:27017";  
const client = new MongoClient(uri);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data



// Configure session
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Route: Registration Page
app.get("/register", (req, res) => {
  res.render("pages/register");
});

// Route: Handle Registration
app.post("/register", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("PaymentDB");
    const users = database.collection("Users");

    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await users.insertOne({ username, password: hashedPassword });
    res.redirect("/login");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route: Login Page
app.get("/login", (req, res) => {
  res.render("pages/login");
});

// Route: Handle Login
app.post("/login", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("PaymentDB");
    const users = database.collection("Users");

    const { username, password } = req.body;
    const user = await users.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = { username };
      res.redirect("/");
    } else {
      res.send("Invalid username or password");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Middleware: Check Authentication
function checkAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

// Protected Route: Home
app.all("/", checkAuth, async (req, res) => {
  try {
    await client.connect();
    const database = client.db("PaymentDB");
    const collection = database.collection("PaymentCollect");

    const { amount, source } = req.body;
      if (amount && source) {
        // Insert the submitted amount and source into the database
        await collection.insertOne({
          salary: parseInt(amount, 10),
          source: source,
        });
        console.log(`Added salary: ${amount} from source: ${source}`);
      }

    const data = await collection.find({}).toArray();
    res.render("pages/home", { items: data, username: req.session.user.username });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
});

// Logout Route
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});



