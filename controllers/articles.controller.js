const {
  fetchArticles,
  fetchArticlesByID,
} = require("../models/articles.model");

function getArticles(req, res) {
  return fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  });
}

function getArticlesByID(req, res) {
  const { article_id } = req.params;
  return fetchArticlesByID(article_id).then((articleByID) => {
    res.status(200).send({ article: articleByID });
  });
}

module.exports = { getArticles, getArticlesByID };
