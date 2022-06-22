const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
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

//middleware for cross origin resources
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, "public")));

// body parses middleware
app.use(bodyParser.json());

//passport middleware
app.use(session({ secret: config.secret }));

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.use("/users", users);

//index route
app.get("/", (req, res) => {
  res.send("Invalid endpoint");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//start server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
