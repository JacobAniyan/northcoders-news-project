const db = require("../db/connection");

function fetchArticles() {
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.topic, 
       articles.created_at, articles.votes, articles.article_img_url,
       COUNT(comments.article_id) AS comment_count
       FROM articles
       LEFT JOIN comments ON comments.article_id = articles.article_id
       GROUP BY  articles.article_id
       ORDER BY articles.created_at DESC;`
    )
    .then(({ rows }) => {
      return rows;
    });
}

function fetchArticlesByID(article_id) {
  if (isNaN(+article_id)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Article Not Found",
        });
      }
      const articleByID = rows[0];
      return articleByID;
    });
}

function fetchArticleComments(article_id) {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1
            ORDER BY comments.created_at DESC`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
}

function addArticleComment(article_id, comment) {
  return db
    .query(
      "INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING author, body",
      [article_id, comment.username, comment.body]
    )
    .then(({ rows }) => {
      return rows;
    });
}

module.exports = {
  fetchArticles,
  fetchArticlesByID,
  fetchArticleComments,
  addArticleComment,
};
