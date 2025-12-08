const express = require("express");
const app = express();
const getTopics = require("./controllers/topics.controller");
const {
  getArticles,
  getArticlesByID,
} = require("./controllers/articles.controller");
const getUsers = require("./controllers/users.controller");
const {
  handleInvalidRoute,
  handleBadRequest,
  handleCustomError,
  handleServerError,
} = require("./errors");

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id", getArticlesByID);

app.all("/*invalidpath", handleInvalidRoute);

app.use(handleBadRequest);

app.use(handleCustomError);

app.use(handleServerError);

module.exports = app;
