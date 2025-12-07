const fetchArticles = require("../models/articles.model");

function getArticles(req, res) {
  return fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  });
}

module.exports = getArticles;
