const db = require("../connection");
const format = require("pg-format");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(
      `
    DROP TABLE IF EXISTS comments;
    DROP TABLE IF EXISTS articles;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS topics;

    CREATE TABLE topics (
      slug VARCHAR(255) PRIMARY KEY, 
      description VARCHAR(255), 
      img_url VARCHAR(1000)
    );

    CREATE TABLE users (
      username VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      avatar_url VARCHAR(1000)
    ); 

    CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(255), 
      topic VARCHAR(255) REFERENCES topics(slug), 
      author VARCHAR(255) REFERENCES users(username), 
      body TEXT, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
      votes INT DEFAULT 0, 
      article_img_url VARCHAR(1000)
    ); 

    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      article_id INT REFERENCES articles(article_id),
      body TEXT,
      votes INT DEFAULT 0, 
      author VARCHAR(255) REFERENCES users(username), 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `
    )
    .then(() => {
      const topicsQueryString = format(
        `INSERT INTO topics (description, slug, img_url) VALUES %L`,
        topicData.map((topic) => [topic.description, topic.slug, topic.img_url])
      );

      const usersQueryString = format(
        `INSERT INTO users (username, name, avatar_url) VALUES %L`,
        userData.map((user) => [user.username, user.name, user.avatar_url])
      );

      const articlesQueryString = format(
        `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING article_id, title`,
        articleData.map((article) => [
          article.title,
          article.topic,
          article.author,
          article.body,
          article.created_at,
          article.votes,
          article.article_img_url,
        ])
      );

      const topics = db.query(topicsQueryString);
      const users = db.query(usersQueryString);
      const articles = db.query(articlesQueryString);

      return Promise.all([articles, topics, users]);
    })
    .then(([articleResult]) => {
      const articleInfo = articleResult.rows;

      const commentQueryString = format(
        `INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L`,
        commentData.map((comment) => {
          // Foreach Comment look through the articles data to find the
          // article_id that matches the article_title of the comment
          const { article_id } = articleInfo.find((info) => {
            return info.article_title === comment.title;
          });
          return [
            article_id,
            comment.body,
            comment.votes,
            comment.author,
            comment.created_at,
          ];
        })
      );

      const comments = db.query(commentQueryString);
      return comments;
    });
};
module.exports = seed;
