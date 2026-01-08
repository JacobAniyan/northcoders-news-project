const express = require("express");
const app = express();
const getTopics = require("./controllers/topics.controller");
const {
  getArticles,
  getArticlesByID,
  getArticleComments,
  postArticleComment,
} = require("./controllers/articles.controller");
const getUsers = require("./controllers/users.controller");
const {
  handleInvalidRoute,
  handleBadRequest,
  handleForeignKeyViolation,
  handleCustomError,
  handleServerError,
} = require("./errors");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/api", express.static("public"));

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id", getArticlesByID);

app.get("/api/articles/:article_id/comments", getArticleComments);

app.post("/api/articles/:article_id/comments", postArticleComment);

app.all("/*invalidpath", handleInvalidRoute);

app.use(handleBadRequest);

app.use(handleForeignKeyViolation);

app.use(handleCustomError);

app.use(handleServerError);

module.exports = app;
