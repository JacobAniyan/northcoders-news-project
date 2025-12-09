const {
  fetchArticles,
  fetchArticlesByID,
  fetchArticleComments,
} = require("../models/articles.model");

function getArticles(req, res) {
  return fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  });
}

function getArticlesByID(req, res, next) {
  const { article_id } = req.params;
  return fetchArticlesByID(article_id)
    .then((articleByID) => {
      res.status(200).send({ article: articleByID });
    })
    .catch((err) => {
      next(err);
    });
}

function getArticleComments(req, res) {
  const { article_id } = req.params;
  return fetchArticleComments(article_id).then((comments) => {
    res.status(200).send({ comments });
  });
}

module.exports = { getArticles, getArticlesByID, getArticleComments };
