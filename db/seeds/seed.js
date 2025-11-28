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
    });
};
module.exports = seed;
