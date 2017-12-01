const express = require("express");
const router = express.Router();
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
var request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Require all models
const db = require("./models");

const PORT = 3000;

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
app.use(express.static("controller"));

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/database", {
  useMongoClient: true
});

// Render home handlebars page
app.get("/", function (req, res) {
  res.render("home");
});

// A GET route for scraping the onion website
app.get("/scrape", function (req, res) {
  // First, we grab the body of the html with request
  axios.get("https://www.theonion.com/c/news-in-brief").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every article tag, and do the following:
    $("div.main__content article").each(function (i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.Headline = $(this)
        .find("h1.headline a")
        .text();
      result.URL = $(this)
        .find("h1.headline a")
        .attr("href");
      result.Summary = $(this)
        .find("div.entry-summary p")
        .text();
      result.Image = $(this)
        .find("div.img-wrapper img")
        .attr("src");

      // Create a new Article using the `result` object built from scraping
      db.Articles
        .create(result)
        .then(function (dbArticles) {
          // If we were able to successfully scrape and save an Article
          res.send("Scrape Complete");
      })
        .catch(function (err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
    });
  });
});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
  // Grab every document in the Articles collection
  db.Articles
    .find({})
    .then(function (dbArticles) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticles);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Render saved articles handlebars page
app.get("/saved", function (req, res) {
  res.render("saved");
});

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
