const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const path = require("path");
const VIEWS_PATH = path.join(__dirname, "/views")
const mustacheExpress = require("mustache-express");

// =============== users routes ===============
const {
    register
    //login
} = require("./handlers/users");
// app.post("/login", login);

app.use("/register", register);
// ============================================

app.get("/register", (req, res) => res.render("register"));
app.get("/login", (req, res) => res.render("login"))

app.use(express.static(path.join(__dirname, "partials")));
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.listen(3000, () => {
    console.log("Server is live on http://localhost:3000");
});