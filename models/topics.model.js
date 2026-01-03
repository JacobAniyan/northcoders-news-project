const db = require("../db/connection");

function fetchTopics() {
  return db
    .query(`SELECT slug, description FROM topics;`)
    .then(({ rows }) => {
      return rows;
    })
    .catch((err) => {
      return err;
    });
}

module.exports = fetchTopics;
