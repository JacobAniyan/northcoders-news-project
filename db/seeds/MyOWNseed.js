const db = require("../connection");
const format = require("pg-format");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(
      `DROP TABLE IF EXISTS Comments;
       DROP TABLE IF EXISTS Articles;
       DROP TABLE IF EXISTS Users;
       DROP TABLE IF EXISTS Topics; `
    )
    .then(() => {
      return db.query(
        `CREATE TABLE Topics (
       slug VARCHAR(100) PRIMARY KEY,
       description VARCHAR(100) NOT NULL,
       img_url VARCHAR(1000)); `
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE Users (
        username VARCHAR(100) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        avatar_url VARCHAR(1000)) `
      );
    })
    .then(() => {
      return db.query(`CREATE TABLE Articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      topic VARCHAR(100) NOT NULL,
      FOREIGN KEY (topic) REFERENCES Topics(slug),
      author VARCHAR(100) NOT NULL,
      FOREIGN KEY (author) REFERENCES Users(username),
      body TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      votes INT DEFAULT 0,
      article_img_url VARCHAR(1000))`);
    })
    .then(() => {
      return db.query(`CREATE TABLE Comments (
      comment_id SERIAL PRIMARY KEY,
      article_id INT NOT NULL,
      FOREIGN KEY (article_id) REFERENCES Articles(article_id),
      body TEXT NOT NULL,
      votes INT DEFAULT 0,
      author VARCHAR(100) NOT NULL,
      FOREIGN KEY (author) REFERENCES Users(username),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
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
      console.log(rows);
      const commentRows = commentData.map((comment) => {
        return [
          comment.article_id,
          comment.body,
          comment.votes,
          comment.author,
          comment.created_at,
        ];
      });

      const insertCommentRows = format(
        `INSERT INTO Comments
          (article_id, body, votes, author, created_at)
          VALUES %`,
        commentRows
      );

      return db.query(insertCommentRows);
    });
};

module.exports = seed;
