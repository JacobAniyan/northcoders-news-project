const express = require("express");
const app = express();
const db = require("./db/connection");
const getTopics = require("./controllers/topics.controller");
const getArticles = require("./controllers/articles.controller");

// app.get("/api/topics", (req, res) => {
//   return db.query(`SELECT slug, description FROM topics;`).then(({ rows }) => {
//     res.status(200).send({ topics: rows });
//   });
// });

app.get("/api/topics", getTopics);

// app.get("/api/articles", (req, res) => {
//   return db.query("SELECT * FROM articles").then(({ rows }) => {
//     res.status(200).send({ articles: rows });
//   });
// });

app.get("/api/articles", getArticles);

module.exports = app;
