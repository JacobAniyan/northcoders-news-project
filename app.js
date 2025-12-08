const express = require("express");
const app = express();
const db = require("./db/connection");
const getTopics = require("./controllers/topics.controller");
const {
  getArticles,
  getArticlesByID,
} = require("./controllers/articles.controller");
const getUsers = require("./controllers/users.controller");

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id", getArticlesByID);

module.exports = app;
