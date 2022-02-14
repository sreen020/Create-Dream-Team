const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();

app.use(express.static("src"));
app.use("/css", express.static(__dirname + "src/css"));
app.use("/js", express.static(__dirname + "./src/js"));
app.use("/img", express.static(__dirname + "src/img"));

// set the view engine to ejs
app.use(expressLayouts);
app.set("layout", "./partials/layout");
app.set("view engine", "ejs");

// ROUTES
// home
app.get("/", (req, res) => {
  res.render("pages/index", { title: "Home" });
});

// Pagina om jouw zoek criteria aan te geven
app.get("/profile", (req, res) => {
  res.render("pages/profile", { title: "Profile" });
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
