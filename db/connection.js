const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";
const pathToCorrectEnvFile = `${__dirname}/../.env.${ENV}`;

// configure dotenv with path to test/development env variable
require("dotenv").config({ path: pathToCorrectEnvFile });

// check if env variable exists
// app needs to know which database to use
if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
} else {
  console.log(`Connected to ${process.env.PGDATABASE}`);
}

const db = new Pool();

module.exports = db;
