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
    }); //<< write your first query in here.
};
module.exports = seed;
