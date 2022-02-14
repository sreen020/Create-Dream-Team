const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();

const dummyData = [
  {
    id: 0,
    firstname: "Aaron",
    lastname: "Keur",
    email: "test@test.com",
    phone: 0612345678,
    skills: 0,
    amount_training_days: 1,
    match_day: 0,
  },
  {
    id: 0,
    firstname: "Niki",
    lastname: "Milo",
    email: "test@test.com",
    phone: 0612345678,
    skills: 0,
    amount_training_days: 0,
    match_day: 0,
  },
  {
    id: 1,
    firstname: "Sjoerd",
    lastname: "Reen",
    email: "test@test.com",
    phone: 0612345678,
    skills: 0,
    amount_training_days: 3,
    match_day: 0,
  },
];

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
  res.render("pages/index", { title: "Home", data: dummyData });
});

app.get("/person/:id", (req, res) => {
  const detailData = dummyData.find((el) => el.id == req.params.id);
  res.render("pages/personDetail", {
    title: `${detailData.firstname} ${detailData.lastname}`,
    data: detailData,
  });
});

// Pagina om jouw zoek criteria aan te geven
app.get("/profile", (req, res) => {
  res.render("pages/profile", { title: "Profile" });
});

app.use("*", (req, res) => {
  res.render("pages/404", { title: "404 page" });
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
