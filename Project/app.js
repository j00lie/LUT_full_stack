const express = require("express");
const path = require("path");
const bodyParses = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/database");

// connect to database
mongoose.connect(config.database);

//confirm connection to db
mongoose.connection.on("connected", () => {
  console.log("Connected to database " + config.database);
});

//check connection error to db
mongoose.connection.on("error", (err) => {
  console.log("Database error: " + err);
});

const app = express();

const users = require("./routes/users");

const port = 3000;
app.use(cors()); //middleware for cross origin resources

//set static folder

app.use(express.static(path.join(__dirname, "public")));

// body parses middleware

app.use(bodyParser.json());

app.use("/users", users);

//index route
app.get("/", (req, res) => {
  res.send("Invalid endpoint");
});

//start server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
