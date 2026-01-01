const {
  fetchArticles,
  fetchArticlesByID,
  fetchArticleComments,
  addArticleComment,
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

function postArticleComment(req, res) {
  const { article_id } = req.params;
  const comment = req.body;
  return addArticleComment(article_id, comment).then((comment) => {
    res.status(201).send({ comment });
  });
}

module.exports = {
  getArticles,
  getArticlesByID,
  getArticleComments,
  postArticleComment,
};
