const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost/data");

app.use(express.static("src"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.use(expressLayouts);
app.set("layout", "./partials/layout");
app.set("view engine", "ejs");

// ROUTES
// home
app.get("/", (req, res) => {
    let searchCriteria;

    // Call the searchCriteria API
    fetch("http://localhost:8000/searchCriteria")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        .then((data) => {
            searchCriteria = data;

            // Fetch users
            return fetch("http://localhost:8000/users");
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        .then((userData) => {
            const filteredData = userData.filter((item) => {
                return (
                    item.skills === searchCriteria.skills &&
                    item.amount_training_days === searchCriteria.amount_training_days &&
                    item.match_day === searchCriteria.match_day
                );
            });

            res.render("pages/index", { title: "Home", data: filteredData });
        })
        .catch((error) => {
            console.warn(error);
        });
});

app.get("/person/:id", (req, res) => {
    fetch(`http://localhost:8000/users/${req.params.id}`)
        .then((res) => res.json())
        .then((data) => {
            res.render("pages/personDetail", {
                title: `${data.firstname} ${data.lastname}`,
                data: data,
            });
        });
});

app.post("/search_criteria", (req, res) => {
    axios
        .put("http://localhost:8000/searchCriteria", req.body)
        .then((request) => {
            res.redirect("/");
        })
        .catch((err) => {
            console.error(err);
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