const express = require("express");
const { engine } = require("express-handlebars");
const mongoose = require("mongoose");
const path = require("path");
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
