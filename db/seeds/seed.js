const db = require("../connection");
const format = require("pg-format");
const { dropTables, createTables } = require("./manageTables");
const getArticleID = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return dropTables()
    .then(() => {
      return createTables();
    })
    .then(() => {
      const topicRows = topicData.map((topic) => {
        return [topic.slug, topic.description, topic.img_url];
      });

      const insertTopicData = format(
        `INSERT INTO Topics (slug, description, img_url) VALUES %L`,
        topicRows
      );

      return db.query(insertTopicData);
    })
    .then(() => {
      const userRows = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      });

      const insertUserRows = format(
        `INSERT INTO Users (username, name, avatar_url) VALUES %L`,
        userRows
      );

      return db.query(insertUserRows);
    })
    .then(() => {
      const articleRows = articleData.map((article) => {
        return [
          article.title,
          article.topic,
          article.author,
          article.body,
          article.created_at,
          article.votes,
          article.article_img_url,
        ];
      });

      const insertArticleRows = format(
        `INSERT INTO Articles 
        (title, topic, author, body, created_at, votes, article_img_url) 
        VALUES %L RETURNING *`,
        articleRows
      );

      return db.query(insertArticleRows);
    })
    .then(({ rows }) => {
      const titleRef = getArticleID(rows, "title", "article_id");

      const commentRows = commentData.map((comment) => {
        return [
          titleRef[comment.article_title], // use article_title property from actual data to refer to article_id
          comment.body,
          comment.votes,
          comment.author,
          comment.created_at,
        ];
      });

      const insertCommentRows = format(
        `INSERT INTO Comments
          (article_id, body, votes, author, created_at)
          VALUES %L`,
        commentRows
      );

      return db.query(insertCommentRows);
    });
};

module.exports = seed;
