const { get } = require("../app");
const fetchArticles = require("../models/articles.models");

function getArticles(req, res) {
  return fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  });
}

module.exports = getArticles;
