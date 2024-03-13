const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const { checkAuth } = require("./middlewares/auth");
const morgan = require("morgan");

//BodyParser
app.use(express.urlencoded({ extended: true }));

//EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

//Static files
app.use(express.static(path.resolve("./public")));

//Logging the API requests
app.use(morgan("dev"));

//CookieParser
app.use(cookieParser());

//Authentication
app.use(checkAuth("token"));

//Routes
app.use("/", router);

module.exports = app;
