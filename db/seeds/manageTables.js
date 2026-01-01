const db = require("../connection");

function dropTables() {
  return db.query(
    `DROP TABLE IF EXISTS Comments;
       DROP TABLE IF EXISTS Articles;
       DROP TABLE IF EXISTS Users;
       DROP TABLE IF EXISTS Topics; `
  );
}

function createTables() {
  return db.query(
    `CREATE TABLE Topics (
      slug VARCHAR(100) PRIMARY KEY,
      description VARCHAR(250) NOT NULL,
      img_url VARCHAR(1000)); 
       
     CREATE TABLE Users (
      username VARCHAR(100) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      avatar_url VARCHAR(1000));
        
     CREATE TABLE Articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      topic VARCHAR(100) NOT NULL,
      FOREIGN KEY (topic) REFERENCES Topics(slug),
      author VARCHAR(100) NOT NULL,
      FOREIGN KEY (author) REFERENCES Users(username),
      body TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      votes INT DEFAULT 0,
      article_img_url VARCHAR(1000));
      
     CREATE TABLE Comments (
      comment_id SERIAL PRIMARY KEY,
      article_id INT NOT NULL,
      FOREIGN KEY (article_id) REFERENCES Articles(article_id),
      body TEXT NOT NULL,
      votes INT DEFAULT 0,
      author VARCHAR(100) NOT NULL,
      FOREIGN KEY (author) REFERENCES Users(username),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
  );
}

module.exports = { dropTables, createTables };
