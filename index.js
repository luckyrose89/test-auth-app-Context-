require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressJwt = require("express-jwt");
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(bodyParser.json());

//connect to db
mongoose.set("useCreateIndex", true);
mongoose.connect(
  "mongodb://localhost:27017/todo-auth-example",
  { useNewUrlParser: true },
  err => {
    if (err) throw err;
    console.log("Connected to the database");
  }
);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({ message: err.message });
});

// Make the app use the express-jwt authentication middleware on anything starting with "/api"
app.use("/api", expressJwt({ secret: process.env.SECRET }));

app.use("/auth", require("./routes/auth"));

app.use("/api/todo", require("./routes/todo"));

app.use((err, req, res, next) => {
  console.error(err);
  return res.send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`[+] Starting server on port ${PORT}`);
});
