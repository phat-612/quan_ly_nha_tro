const express = require("express");
const session = require("express-session");
const { engine } = require("express-handlebars");
const mongoose = require("mongoose");
const path = require("path");
const flash = require("connect-flash");
const app = express();

mongoose
  .connect(
    "mongodb+srv://nguyenphatssj0612:CQXslj50ZmEIDF0W@cluster0.9o7krfq.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true,
  })
);

// Set up flash middleware
app.use(flash());

// Set up a global variable for flash messages (optional)
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.engine(
  "handlebars",
  engine({
    helpers: require("./helpers/handlebars"),
  })
);
app.set("view engine", "handlebars");
app.use(require("./routes"));
app.listen(3000, () => {
  console.log("Server is running on port 3000: http://localhost:3000/admin");
});
